<script lang="ts">
	import { goto } from '$app/navigation';
	import editDistance from '$lib/edit-distance';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scrollY } from 'svelte/reactivity/window';

	const { data } = $props();

	let inputText = $state('');

	let sortedRecipes = $derived.by(() => {
		const pattern = inputText.replace(/\s/g, '');
		return data.recipes.toSorted(
			(a, b) =>
				editDistance(pattern, a.title.toLowerCase()) - editDistance(pattern, b.title.toLowerCase())
		);
	});

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

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		goto(`/${sortedRecipes[0].slug}/`);
	}
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
	<form
		class="col-start-2 col-end-4 w-full max-w-lg justify-self-center md:col-end-3"
		onsubmit={handleSubmit}
	>
		<input
			bind:value={inputText}
			bind:this={inputElement}
			oninput={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
			type="search"
			class="w-full rounded border-base-300"
			placeholder="Sök recept..."
		/>
	</form>
</div>

<div class="flex-grow p-2">
	<div class="mx-auto max-w-lg">
		<ul class="space-y-2">
			{#each sortedRecipes as recipe (recipe.slug)}
				<li animate:flip={{ duration: 150 }}>
					<a
						href={`/${recipe.slug}`}
						class="flex h-14 items-center overflow-hidden rounded bg-white shadow active:underline sm:h-16"
					>
						<div class="aspect-[5/3] h-full">
							<enhanced:img src={recipe.picture} alt="" class="size-full object-cover" />
						</div>
						<div class="px-[clamp(0.75rem,3%,1rem)] py-2 text-sm leading-tight sm:text-base">
							{recipe.title}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
