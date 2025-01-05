<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import FilterChip from './FilterChip.svelte';
	import FilterChips from './FilterChips.svelte';
	import type { SectionComponentProps } from './FilterEditor.svelte';
	import Slider from './Slider.svelte';
	import ToggleSwitch from './ToggleSwitch.svelte';

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
	let excludeRecipesWithoutRating = $state(false);
	let minRating = $state(0);

	processRecipes = (recipes) => {
		return recipes
			.map((recipe) => {
				if (Object.values(peopleSelection).every((isSelected) => !isSelected)) {
					return recipe;
				}
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
			})
			.filter((recipe) => {
				if (recipe.ratings !== undefined) {
					const ratingEntries = Object.entries(recipe.ratings);
					const avg =
						ratingEntries.reduce((sum, [_, rating]) => sum + rating, 0) / ratingEntries.length;
					if (avg < minRating) {
						return false;
					}
				} else if (excludeRecipesWithoutRating) {
					return false;
				}
				return true;
			});
	};

	$effect(() => {
		let count = 0;
		if (Object.values(peopleSelection).some((isSelected) => isSelected)) {
			count++;
		}
		if (excludeRecipesWithoutRating) {
			count++;
		}
		if (minRating !== 0) {
			count++;
		}
		activeFilterCount = count;
	});

	reset = () => {
		peopleSelection = defaultPeopleSelection;
		excludeRecipesWithoutRating = false;
		minRating = 0;
	};
</script>

<div class="space-y-2">
	<FilterChip
		isActive={Object.values(peopleSelection).every((isSelected) => !isSelected)}
		onToggle={() => (peopleSelection = defaultPeopleSelection)}>Alla</FilterChip
	>
	<FilterChips bind:selection={peopleSelection} />
</div>

<div class="flex items-center justify-between gap-x-2">
	<label for="exclude-recipes-without-rating">Exkludera rätter utan betyg:</label>
	<ToggleSwitch id="exclude-recipes-without-rating" bind:value={excludeRecipesWithoutRating} />
</div>

<Slider
	label="Minimalt snittbetyg"
	bind:value={minRating}
	labels={['0', '1', '2', '3']}
	step={0.5}
/>
