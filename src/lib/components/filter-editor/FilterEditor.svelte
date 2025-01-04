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

	type FilterStates = {
		tags: {
			tagSelection: Record<string, boolean>;
		};
	};

	const defaultStates: FilterStates = {
		tags: {
			tagSelection: Object.fromEntries(
				allRecipes.flatMap((recipe) => recipe.tags || []).map((tag) => [tag, false])
			)
		}
	};

	let filterStates: FilterStates = $state(JSON.parse(JSON.stringify(defaultStates)));

	function getFilteredRecipes() {
		let recipes: Recipe[] = JSON.parse(JSON.stringify(allRecipes));

		recipes = recipes.filter((recipe) =>
			Object.entries(filterStates.tags.tagSelection)
				.filter(([, isSelected]) => isSelected)
				.every(([selectedTag]) => recipe.tags?.some((tag) => tag === selectedTag))
		);

		return recipes;
	}

	function getActiveFilterCount() {
		let count = 0;

		count += Object.values(filterStates.tags.tagSelection).reduce(
			(acc, isSelected) => acc + (isSelected ? 1 : 0),
			0
		);

		return count;
	}

	$effect(() => {
		filteredRecipes = getFilteredRecipes();
		activeFilterCount = getActiveFilterCount();
	});

	function resetAllFilters() {
		filterStates = JSON.parse(JSON.stringify(defaultStates));
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
		<FilterChips bind:state={filterStates.tags.tagSelection} />
	</Section>
</div>
