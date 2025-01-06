<script lang="ts">
	import { SessionState } from '$lib/session-state.svelte';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';
	import { mealTypesList } from '$lib/recipe';

	let {
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	const defaultMealTypesSelection = Object.fromEntries(
		mealTypesList.map((mealType) => [mealType, false])
	);

	let mealTypesSelection = new SessionState('filters-meal-types-mts', defaultMealTypesSelection);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			return Object.entries(mealTypesSelection.value)
				.filter(([, isSelected]) => isSelected)
				.every(([selectedMealType]) =>
					recipe.mealTypes.some((mealType) => mealType === selectedMealType)
				);
		});
	};

	$effect(() => {
		activeFilterCount = Object.values(mealTypesSelection.value).filter(
			(isSelected) => isSelected
		).length;
	});

	reset = () => {
		mealTypesSelection.value = defaultMealTypesSelection;
	};
</script>

<FilterChips bind:selection={mealTypesSelection.value} />
