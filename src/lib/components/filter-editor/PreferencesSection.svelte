<script lang="ts">
	import { preferencesList, type Recipe } from '$lib/recipe';
	import FilterChips from './FilterChips.svelte';
	import type { FilterSectionProps } from './FilterEditor.svelte';

	let {
		activeFilterCount = $bindable(),
		filterFunction = $bindable(),
		onReset = $bindable()
	}: FilterSectionProps = $props();

	let preferencesState: Record<string, boolean> = $state(
		Object.fromEntries(preferencesList.map((preference) => [preference, false]))
	);

	$effect(() => {
		activeFilterCount = Object.values(preferencesState).reduce(
			(acc, cur) => acc + (cur ? 1 : 0),
			0
		);
	});

	onReset = () => {
		preferencesState = Object.fromEntries(preferencesList.map((preference) => [preference, false]));
	};

	filterFunction = (recipes: Recipe[]) => {
		return recipes.filter((recipe) => {
			return Object.entries(preferencesState)
				.filter(([, isActive]) => isActive)
				.map(([activePreference]) => activePreference)
				.every(
					(activePreference) =>
						recipe.preferences !== undefined &&
						recipe.preferences.some((preference) => preference === activePreference)
				);
		});
	};
</script>

<FilterChips state={preferencesState} />
