<script lang="ts">
	import { goto } from '$app/navigation';
	import TopBar from '$lib/components/TopBar.svelte';
	import TopBarIcon from '$lib/components/TopBarIcon.svelte';
	import editDistance from '$lib/edit-distance';
	import { onMount } from 'svelte';
	import IconArrowLeft from '~icons/tabler/arrow-left';

	const { data } = $props();

	let inputText = $state('');

	let sortedRecipes = $derived.by(() => {
		const pattern = inputText.replace(/\s/g, '');
		return data.recipes.toSorted(
			(a, b) =>
				editDistance(pattern, a.title.toLowerCase()) - editDistance(pattern, b.title.toLowerCase())
		);
	});

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

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		goto(`/${sortedRecipes[0].slug}/`);
	}
</script>

<svelte:head>
	<style>
		body {
			background-color: rgb(var(--tw-base-100));
		}
	</style>
</svelte:head>

<TopBar>
	<div class="grid grid-cols-[2.5rem_1fr_2.5rem] gap-x-2">
		<a class="col-start-1" href="/">
			<TopBarIcon>
				<IconArrowLeft />
			</TopBarIcon>
		</a>
		<form
			class="col-start-2 col-end-4 w-full max-w-lg justify-self-center md:col-end-3"
			onsubmit={handleSubmit}
		>
			<input
				bind:value={inputText}
				oninput={() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				type="search"
				class="w-full rounded border-base-200"
				placeholder="Sök recept..."
			/>
		</form>
	</div>
</TopBar>

<div class="flex-grow p-4">
	<div class="mx-auto max-w-lg">
		<ul class="space-y-2">
			{#each sortedRecipes as recipe}
				<li class="">
					<a
						href={`/${recipe.slug}`}
						class="flex h-20 items-center overflow-hidden rounded bg-white shadow active:underline"
					>
						<img
							src={`/recipe-photos/${recipe.slug}.webp`}
							alt=""
							class="aspect-[5/3] h-full rounded-l object-cover"
						/>
						<div class="px-[clamp(0.75rem,3%,1rem)] py-2 leading-tight">
							{recipe.title}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
