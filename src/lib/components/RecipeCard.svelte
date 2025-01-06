<script lang="ts">
	import Stars from '$lib/components/Stars.svelte';
	import TimeDisplay from '$lib/components/TimeDisplay.svelte';
	import type { Recipe } from '$lib/recipe';
	let { recipe }: { recipe: Recipe } = $props();

	const avgRating = (ratings: Record<string, number>): number => {
		const values = Object.values(ratings);
		return values.reduce((sum, value) => sum + value, 0) / values.length;
	};
</script>

{#snippet Property(label: string, list: string[])}
	<div class="flex flex-wrap items-center gap-x-2 gap-y-1 leading-none">
		<div>{label}:</div>
		{#each list as item}
			<div class="rounded bg-base-100 px-2 py-1">{item}</div>
		{/each}
	</div>
{/snippet}

<div class="w-full max-w-[32rem] rounded-lg bg-white p-6 shadow">
	<a href={`/${recipe.slug}`} class="text-2xl font-semibold active:underline">
		{recipe.title}
	</a>
	<div class="mt-1 flex">
		{#if recipe.ratings !== undefined}
			<Stars rating={avgRating(recipe.ratings)} />
		{/if}
		<div class="ml-auto">
			<TimeDisplay activeTime={recipe.activeTime} totalTime={recipe.totalTime} />
		</div>
	</div>
	<a
		href={`/${recipe.slug}`}
		class="group relative mt-4 block aspect-[2/1] overflow-hidden rounded"
		aria-label={recipe.title}
	>
		<enhanced:img src={recipe.picture} alt="" class="size-full object-cover" />
		<div class="absolute left-0 top-0 size-full group-active:bg-black/20"></div>
	</a>
	<div class="mt-6">
		<div class="space-y-3">
			{@render Property('Typ', recipe.mealTypes)}
			{#if recipe.preferences !== undefined}
				{@render Property('Specialkost', recipe.preferences)}
			{/if}
			{#if recipe.tags !== undefined}
				{@render Property('Etiketter', recipe.tags)}
			{/if}
		</div>
	</div>
</div>
