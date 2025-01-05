<script lang="ts">
	import { SessionState } from '$lib/session-state.svelte';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';
	import { preferencesList } from '$lib/recipe';

	let {
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	const defaultSelection = Object.fromEntries(
		preferencesList.map((preference) => [preference, false])
	);

	let preferencesSelection = new SessionState('filters-exclude-preferences-ps', defaultSelection);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			return !Object.entries(preferencesSelection.value)
				.filter(([, isSelected]) => isSelected)
				.some(
					([selectedPreference]) =>
						recipe.preferences !== undefined &&
						recipe.preferences.some((preference) => preference === selectedPreference)
				);
		});
	};

	$effect(() => {
		activeFilterCount = Object.values(preferencesSelection.value).filter(
			(isSelected) => isSelected
		).length;
	});

	reset = () => {
		preferencesSelection.value = defaultSelection;
	};
</script>

<FilterChips bind:selection={preferencesSelection.value} />
