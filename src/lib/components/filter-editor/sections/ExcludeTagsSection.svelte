<script lang="ts">
	import { SessionState } from '$lib/session-state.svelte';
	import FilterChips from '$lib/components/FilterChips.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';

	let {
		allRecipes,
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	const defaultTagSelection = Object.fromEntries(
		allRecipes.flatMap((recipe) => recipe.tags || []).map((tag) => [tag, false])
	);

	let tagSelection = new SessionState('filters-exclude-tags-ts', defaultTagSelection);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			return !Object.entries(tagSelection.value)
				.filter(([, isSelected]) => isSelected)
				.some(
					([selectedTag]) =>
						recipe.tags !== undefined && recipe.tags.some((tag) => tag === selectedTag)
				);
		});
	};

	$effect(() => {
		activeFilterCount = Object.values(tagSelection.value).filter((isSelected) => isSelected).length;
	});

	reset = () => {
		tagSelection.value = defaultTagSelection;
	};
</script>

<FilterChips bind:selection={tagSelection.value} />
