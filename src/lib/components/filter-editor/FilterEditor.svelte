<script module lang="ts">
	export type SectionComponentProps = {
		allRecipes: Recipe[];
		processRecipes: (recipes: Recipe[]) => Recipe[];
		activeFilterCount: number;
		reset: () => void;
	};
</script>

<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import IconRestore from '~icons/tabler/restore';
	import type { Component } from 'svelte';
	import SectionLayout from './SectionLayout.svelte';
	import RatingsSection from './sections/RatingsSection.svelte';
	import TimeSection from './sections/TimeSection.svelte';
	import MealTypesSection from './sections/MealTypesSection.svelte';
	import PreferencesSection from './sections/PreferencesSection.svelte';
	import TagsSection from './sections/TagsSection.svelte';
	import IngredientsSection from './sections/IngredientsSection.svelte';
	import ExcludeMealTypesSection from './sections/ExcludeMealTypesSection.svelte';
	import ExcludePreferencesSection from './sections/ExcludePreferencesSection.svelte';
	import ExcludeTagsSection from './sections/ExcludeTagsSection.svelte';
	import ExcludeIngredientsSection from './sections/ExcludeIngredientsSection.svelte';

	let {
		allRecipes,
		filteredRecipes = $bindable(),
		activeFilterCount = $bindable()
	}: {
		allRecipes: Recipe[];
		filteredRecipes: Recipe[];
		activeFilterCount: number;
	} = $props();

	type Section = {
		label: string;
		openByDefault: boolean;
		component: Component<SectionComponentProps>;
	};
	const sections: Section[] = [
		{
			label: 'Betyg',
			openByDefault: true,
			component: RatingsSection
		},
		{
			label: 'Tid',
			openByDefault: true,
			component: TimeSection
		},
		{
			label: 'Typ',
			openByDefault: true,
			component: MealTypesSection
		},
		{
			label: 'Specialkost',
			openByDefault: true,
			component: PreferencesSection
		},
		{
			label: 'Etiketter',
			openByDefault: true,
			component: TagsSection
		},
		{
			label: 'Ingredienser',
			openByDefault: true,
			component: IngredientsSection
		},
		{
			label: 'Exkludera typ',
			openByDefault: false,
			component: ExcludeMealTypesSection
		},
		{
			label: 'Exkludera specialkost',
			openByDefault: false,
			component: ExcludePreferencesSection
		},
		{
			label: 'Exkludera etiketter',
			openByDefault: false,
			component: ExcludeTagsSection
		},
		{
			label: 'Exkludera ingredienser',
			openByDefault: false,
			component: ExcludeIngredientsSection
		}
	];

	type SectionState = {
		processRecipes: (recipse: Recipe[]) => Recipe[];
		activeFilterCount: number;
		reset: () => void;
	};
	const sectionStates: Record<string, SectionState> = $state(
		Object.fromEntries(
			sections.map((section) => [
				section.label,
				{
					processRecipes: (recipes) => recipes,
					activeFilterCount: 0,
					reset: () => {}
				}
			])
		)
	);

	function resetAllFilters() {
		Object.values(sectionStates).forEach((sectionState) => {
			sectionState.reset();
		});
	}

	function processAllRecipes() {
		let recipes = JSON.parse(JSON.stringify(allRecipes));
		Object.values(sectionStates).forEach((sectionState) => {
			recipes = sectionState.processRecipes(recipes);
		});
		return recipes;
	}

	$effect(() => {
		activeFilterCount = Object.values(sectionStates).reduce(
			(acc, sectionState) => acc + sectionState.activeFilterCount,
			0
		);
		filteredRecipes = processAllRecipes();
	});
</script>

<div class="space-y-2">
	<div class="mb-8">
		<h2 class="text-xl font-semibold leading-none">Filter</h2>
		<div class="text-sm">
			{activeFilterCount} aktiv{#if activeFilterCount !== 1}a{/if}
		</div>
		<button
			disabled={activeFilterCount === 0}
			class="mt-2 flex items-center gap-x-1 rounded bg-base-200 px-2 py-1 text-sm active:bg-base-300 disabled:text-base-500 disabled:active:bg-base-200"
			onclick={resetAllFilters}
		>
			<IconRestore />
			Återställ alla
		</button>
	</div>
	{#each sections as section}
		<SectionLayout label={section.label} openByDefault={section.openByDefault}>
			<section.component
				{allRecipes}
				bind:processRecipes={sectionStates[section.label].processRecipes}
				bind:activeFilterCount={sectionStates[section.label].activeFilterCount}
				bind:reset={sectionStates[section.label].reset}
			/>
		</SectionLayout>
	{/each}
</div>
