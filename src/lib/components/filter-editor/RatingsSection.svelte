<script lang="ts">
	import type { Recipe } from '$lib/recipe';
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

	const getActiveFilterCount = () => {
		let count = 0;
		if (Object.values(peopleSelection).some((isSelected) => isSelected)) {
			count++;
		}
		return count;
	};

	$effect(() => {
		activeFilterCount = getActiveFilterCount();
	});

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

	reset = () => {
		peopleSelection = defaultPeopleSelection;
	};
</script>

<FilterChips bind:state={peopleSelection} />
