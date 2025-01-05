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
	import SectionLayout from './SectionLayout.svelte';
	import TagsSection from './TagsSection.svelte';
	import type { Component } from 'svelte';
	import RatingsSection from './RatingsSection.svelte';

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
	const sections: Record<string, Section> = {
		ratings: {
			label: 'Betyg',
			openByDefault: true,
			component: RatingsSection
		},
		tags: {
			label: 'Etiketter',
			openByDefault: true,
			component: TagsSection
		}
	};

	type SectionState = {
		processRecipes: (recipse: Recipe[]) => Recipe[];
		activeFilterCount: number;
		reset: () => void;
	};
	const sectionStates: Record<string, SectionState> = $state(
		Object.fromEntries(
			Object.keys(sections).map((key) => [
				key,
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
	{#each Object.entries(sections) as [sectionName, section]}
		<SectionLayout label={section.label} openByDefault={section.openByDefault}>
			<section.component
				{allRecipes}
				bind:processRecipes={sectionStates[sectionName].processRecipes}
				bind:activeFilterCount={sectionStates[sectionName].activeFilterCount}
				bind:reset={sectionStates[sectionName].reset}
			/>
		</SectionLayout>
	{/each}
</div>
