<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import FilterChip from './FilterChip.svelte';
	import FilterChips from './FilterChips.svelte';
	import type { SectionComponentProps } from './FilterEditor.svelte';

	let {
		allRecipes,
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	const defaultPeopleSelection = Object.fromEntries(
		allRecipes.flatMap((recipe) => Object.keys(recipe.ratings || {})).map((name) => [name, false])
	);

	let peopleSelection = $state(defaultPeopleSelection);

	const filterRatings = (recipe: Recipe) => {
		const newRatingEntries: [string, number][] = [];
		Object.entries(recipe.ratings || {}).forEach(([name, rating]) => {
			if (peopleSelection[name]) {
				newRatingEntries.push([name, rating]);
			}
		});
		const newRatings =
			newRatingEntries.length === 0 ? undefined : Object.fromEntries(newRatingEntries);
		return {
			...recipe,
			ratings: newRatings
		};
	};

	processRecipes = (recipes) => {
		return recipes.map(filterRatings);
	};

	$effect(() => {
		let count = 0;
		if (Object.values(peopleSelection).some((isSelected) => isSelected)) {
			count++;
		}
		activeFilterCount = count;
	});

	reset = () => {
		peopleSelection = defaultPeopleSelection;
	};
</script>

<div class="space-y-2">
	<FilterChip
		isActive={Object.values(peopleSelection).every((isSelected) => !isSelected)}
		onToggle={() => (peopleSelection = defaultPeopleSelection)}>Alla</FilterChip
	>
	<FilterChips bind:selection={peopleSelection} />
</div>
