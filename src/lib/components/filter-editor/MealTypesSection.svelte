<script lang="ts">
	import { mealTypesList, type Recipe } from '$lib/recipe';
	import FilterChips from './FilterChips.svelte';
	import type { FilterSectionProps } from './FilterEditor.svelte';

	let {
		activeFilterCount = $bindable(),
		filterFunction = $bindable(),
		onReset = $bindable()
	}: FilterSectionProps = $props();

	let mealTypesState: Record<string, boolean> = $state(
		Object.fromEntries(mealTypesList.map((mealType) => [mealType, false]))
	);

	$effect(() => {
		activeFilterCount = Object.values(mealTypesState).reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
	});

	onReset = () => {
		mealTypesState = Object.fromEntries(mealTypesList.map((mealType) => [mealType, false]));
	};

	filterFunction = (recipes: Recipe[]) => {
		return recipes.filter((recipe) => {
			return Object.entries(mealTypesState)
				.filter(([, isActive]) => isActive)
				.map(([mealType]) => mealType)
				.every((activeMealType) =>
					recipe.mealTypes.some((mealType) => mealType === activeMealType)
				);
		});
	};
</script>

<FilterChips state={mealTypesState} />
