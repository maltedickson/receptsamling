<script lang="ts">
	import FilterChips from './FilterChips.svelte';
	import type { SectionComponentProps } from './FilterEditor.svelte';

	let {
		allRecipes,
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	const defaultTagSelection = Object.fromEntries(
		allRecipes.flatMap((recipe) => recipe.tags || []).map((tag) => [tag, false])
	);

	let tagSelection = $state(defaultTagSelection);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			return Object.entries(tagSelection)
				.filter(([, isSelected]) => isSelected)
				.every(
					([selectedTag]) =>
						recipe.tags !== undefined && recipe.tags.some((tag) => tag === selectedTag)
				);
		});
	};

	$effect(() => {
		activeFilterCount = Object.values(tagSelection).filter((isSelected) => isSelected).length;
	});

	reset = () => {
		tagSelection = defaultTagSelection;
	};
</script>

<FilterChips bind:state={tagSelection} />
