<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import { SessionState } from '$lib/session-state.svelte';
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

	let peopleSelection = new SessionState('filters-ratings-ps', defaultPeopleSelection);
	let excludeRecipesWithoutRating = new SessionState('filters-ratings-erwr', false);
	let minRating = new SessionState('filters-ratings-mr', 0);

	processRecipes = (recipes) => {
		return recipes
			.map((recipe) => {
				if (Object.values(peopleSelection.value).every((isSelected) => !isSelected)) {
					return recipe;
				}
				const newRatingEntries: [string, number][] = [];
				Object.entries(recipe.ratings || {}).forEach(([name, rating]) => {
					if (peopleSelection.value[name]) {
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
					if (avg < minRating.value) {
						return false;
					}
				} else if (excludeRecipesWithoutRating.value) {
					return false;
				}
				return true;
			});
	};

	$effect(() => {
		let count = 0;
		if (Object.values(peopleSelection.value).some((isSelected) => isSelected)) {
			count++;
		}
		if (excludeRecipesWithoutRating.value) {
			count++;
		}
		if (minRating.value !== 0) {
			count++;
		}
		activeFilterCount = count;
	});

	reset = () => {
		peopleSelection.value = defaultPeopleSelection;
		excludeRecipesWithoutRating.value = false;
		minRating.value = 0;
	};
</script>

<div class="space-y-2">
	<FilterChip
		isActive={Object.values(peopleSelection.value).every((isSelected) => !isSelected)}
		onToggle={() => (peopleSelection.value = defaultPeopleSelection)}>Alla</FilterChip
	>
	<FilterChips bind:selection={peopleSelection.value} />
</div>

<div class="flex items-center justify-between gap-x-2">
	<label for="exclude-recipes-without-rating">Exkludera rätter utan betyg:</label>
	<ToggleSwitch
		id="exclude-recipes-without-rating"
		bind:value={excludeRecipesWithoutRating.value}
	/>
</div>

<Slider
	label="Minimalt snittbetyg"
	bind:value={minRating.value}
	labels={['0', '1', '2', '3']}
	step={0.5}
/>
