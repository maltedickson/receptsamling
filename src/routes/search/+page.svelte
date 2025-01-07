<script lang="ts">
	import getEditDistance from '$lib/edit-distance';
	import type { Recipe } from '$lib/recipe.js';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scrollY } from 'svelte/reactivity/window';

	const { data } = $props();

	let inputText = $state('');

	const getScore = (patternLength: number, distance: number): number =>
		(patternLength - distance) / patternLength;

	type Result = {
		recipe: Recipe;
		distance: number;
		indices: Set<number>;
	};
	const resultCompareFn = (a: Result, b: Result): number => {
		if (a.distance !== b.distance) {
			return a.distance - b.distance;
		}
		const getExtra = (res: Result): number => {
			let extra = 0;
			res.indices.forEach((idx) => {
				if (idx === 0) {
					extra += 2;
					return;
				}
				const wordCharRegex = /[a-zåäöA-ZÅÄÖ]/;
				const isWordStart = !wordCharRegex.test(res.recipe.title[idx - 1]);
				if (isWordStart) {
					extra++;
				}
			});
			return extra;
		};
		return getExtra(b) - getExtra(a);
	};
	const getResults = (patterns: string[]): Result[] => {
		const results: Result[] = [];
		data.recipes.forEach((recipe) => {
			const result: Result = {
				recipe: recipe,
				distance: 0,
				indices: new Set()
			};
			let isCloseEnough = true;
			patterns.forEach((pattern) => {
				if (!isCloseEnough) {
					return;
				}
				const { distance, indices } = getEditDistance(pattern, recipe.title.toLowerCase());
				const score = getScore(pattern.length, distance);
				if (score < 0.6) {
					isCloseEnough = false;
					return;
				}
				result.distance += distance;
				result.indices = result.indices.union(indices);
			});
			if (isCloseEnough) {
				results.push(result);
			}
		});
		return Object.values(results).toSorted(resultCompareFn);
	};

	let inputElement: HTMLInputElement;

	onMount(() => {
		sessionStorage.setItem('all-recipes-view', 'search');
	});

	onMount(() => {
		const key = 'search-page-input-text';
		const storedInputText = sessionStorage.getItem(key);
		if (storedInputText !== null) {
			inputText = storedInputText;
		}
		$effect(() => {
			sessionStorage.setItem(key, inputText);
		});
	});

	onMount(() => {
		inputElement.focus();
	});
</script>

<svelte:head>
	<title>Familjens receptsamling</title>
	<style>
		body {
			background-color: rgb(var(--tw-base-100));
		}
	</style>
</svelte:head>

<div class="bg-base-100">
	<div class="flex justify-center">
		<a class="block py-2 text-center font-semibold leading-tight" href="/">
			Familjens<br />receptsamling
		</a>
	</div>
</div>
<div
	class={[
		'sticky top-0 flex justify-center bg-base-100 p-2',
		{ 'shadow-md': scrollY.current && scrollY.current > 56 }
	]}
>
	<div class="col-start-2 col-end-4 w-full max-w-lg justify-self-center md:col-end-3">
		<input
			bind:value={inputText}
			bind:this={inputElement}
			oninput={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
			type="search"
			class="w-full rounded border-base-300"
			placeholder="Sök recept..."
			required
		/>
	</div>
</div>

{#if inputText !== ''}
	<div class="flex-grow p-2">
		<div class="mx-auto max-w-lg">
			<ul class="space-y-2">
				{#each getResults(inputText
						.toLowerCase()
						.split(' ')
						.filter((word) => word !== '')) as result (result.recipe.slug)}
					<li animate:flip={{ duration: 150 }}>
						<a
							href={`/${result.recipe.slug}`}
							class="flex h-14 items-center overflow-hidden rounded bg-white shadow active:underline sm:h-16"
						>
							<div class="aspect-[5/3] h-full">
								<enhanced:img src={result.recipe.picture} alt="" class="size-full object-cover" />
							</div>
							<div class="px-[clamp(0.75rem,3%,1rem)] py-2 text-sm leading-tight sm:text-base">
								{#each result.recipe.title as char, idx}
									{#if result.indices.has(idx)}
										<strong class="">{char}</strong>
									{:else}
										<span>{char}</span>
									{/if}
								{/each}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
