<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import IconRestore from '~icons/tabler/restore';
	import Section from './Section.svelte';
	import FilterChips from './FilterChips.svelte';

	let {
		allRecipes,
		filteredRecipes = $bindable(),
		activeFilterCount = $bindable()
	}: {
		allRecipes: Recipe[];
		filteredRecipes: Recipe[];
		activeFilterCount: number;
	} = $props();

	let tagSelection: Record<string, boolean> = $state(
		Object.fromEntries(allRecipes.flatMap((recipe) => recipe.tags || []).map((tag) => [tag, false]))
	);

	let selectedTagCount = $derived(
		Object.values(tagSelection).reduce((acc, isSelected) => acc + (isSelected ? 1 : 0), 0)
	);

	let filtered = $derived(
		allRecipes.filter((recipe) =>
			Object.entries(tagSelection)
				.filter(([, isSelected]) => isSelected)
				.every(([selectedTag]) => recipe.tags?.some((tag) => tag === selectedTag))
		)
	);

	$effect(() => {
		filteredRecipes = filtered;
		activeFilterCount = selectedTagCount;
	});

	function resetAllFilters() {
		tagSelection = Object.fromEntries(
			allRecipes.flatMap((recipe) => recipe.tags || []).map((tag) => [tag, false])
		);
	}
</script>

<div class="space-y-2">
	<div class="mb-8">
		<h2 class="text-xl font-semibold leading-none">Filter</h2>
		<div class="text-sm">
			{activeFilterCount} aktiv{#if activeFilterCount !== 1}a{/if}
		</div>
		<button
			disabled={activeFilterCount === 0}
			class="mt-2 flex items-center gap-x-1 rounded bg-base-200 px-2 py-1 text-sm active:bg-base-300 disabled:text-base-500 disabled:active:bg-base-200"
			onclick={resetAllFilters}
		>
			<IconRestore />
			Återställ alla
		</button>
	</div>
	<Section label="Etiketter" openByDefualt={true}>
		<FilterChips bind:state={tagSelection} />
	</Section>
</div>
