<script lang="ts">
	import Stars from '$lib/components/Stars.svelte';
	import { activeTimeToString } from '$lib/recipe.js';
	import { onMount } from 'svelte';
	import IconChevronLeft from '~icons/tabler/chevron-left';
	const { data } = $props();
	const recipe = data.recipe;

	let hrefToAllRecipes = $state('/');

	onMount(() => {
		const storedView = sessionStorage.getItem('all-recipes-view');
		if (storedView === 'search') {
			hrefToAllRecipes = '/search/';
		}
	});

	function getAvgRating(ratings: Record<string, number>): number {
		let total = 0;
		let count = 0;
		for (const [, value] of Object.entries(ratings)) {
			total += value;
			count++;
		}
		return total / count;
	}
</script>

<div class="flex px-3 py-4">
	<a href={hrefToAllRecipes} class="flex items-center">
		<IconChevronLeft />
		<span>Alla recept</span>
	</a>
</div>

{#snippet property(label: string, list: string[])}
	<div class="flex flex-wrap items-center gap-x-2 gap-y-1 leading-none">
		<div>{label}:</div>
		{#each list as item}
			<div class="rounded bg-base-100 px-2 py-1">{item}</div>
		{/each}
	</div>
{/snippet}

<div class="prose prose-base mx-auto mt-2 box-content px-4 pb-8 prose-h1:font-bold">
	<h1 class="mb-2">{recipe.title}</h1>
	<div class="not-prose">
		{#if recipe.ratings !== undefined}
			<details>
				<summary class="flex w-fit cursor-pointer text-lg">
					<Stars rating={getAvgRating(recipe.ratings)} />
				</summary>
				<table class="ml-4 mt-2">
					<tbody>
						{#each Object.entries(recipe.ratings) as [name, rating]}
							<tr>
								<td>{name}</td>
								<td class="pl-4 text-sm">
									<Stars {rating} />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</div>
	<img src={`/recipe-photos/${recipe.slug}.webp`} alt="" class="aspect-[2/1] w-full object-cover" />
	<div class="not-prose">
		<div class="space-y-3">
			<div>
				<div>Aktiv tid: {activeTimeToString(recipe.activeTime)} h</div>
				{#if recipe.totalTime !== undefined}
					<div>Total tid: {recipe.totalTime} h</div>
				{/if}
			</div>
			{@render property('Typ', recipe.mealTypes)}
			{#if recipe.preferences !== undefined}
				{@render property('Specialkost', recipe.preferences)}
			{/if}
			{#if recipe.tags !== undefined}
				{@render property('Etiketter', recipe.tags)}
			{/if}
		</div>
	</div>
	<h2>
		Ingredienser
		{#if recipe.servings !== undefined}
			({recipe.servings} portion{#if recipe.servings !== 1}er{/if})
		{/if}
	</h2>
	<div>
		{#each Object.entries(recipe.ingredients) as [heading, list]}
			<div>
				{#if heading !== ''}
					<h3>{heading}</h3>
				{/if}
				<table class="w-auto">
					<tbody>
						{#each list as item}
							<tr>
								<td>{item[0]}</td>
								<td class="pl-4">{item[1]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html recipe.content}
</div>
