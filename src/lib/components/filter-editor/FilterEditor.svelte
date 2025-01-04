<script module lang="ts">
	export type FilterSectionProps = {
		activeFilterCount: number;
		filterFunction: (recipes: Recipe[]) => Recipe[];
		onReset: () => void;
	};
</script>

<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import type { Component } from 'svelte';
	import MealTypesSection from './MealTypesSection.svelte';
	import IconChevronDown from '~icons/tabler/chevron-down';
	import IconRestore from '~icons/tabler/restore';
	import PreferencesSection from './PreferencesSection.svelte';

	let {
		activeFilterCount = $bindable(),
		filterFunction = $bindable()
	}: { activeFilterCount: number; filterFunction: (recipes: Recipe[]) => Recipe[] } = $props();

	type FilterSection = {
		label: string;
		isOpen: boolean;
		props: FilterSectionProps;
		component: Component<FilterSectionProps>;
	};

	let sections: FilterSection[] = $state([
		{
			label: 'Typ',
			isOpen: true,
			props: { activeFilterCount: 0, filterFunction: (recipes) => recipes, onReset: () => {} },
			component: MealTypesSection
		},
		{
			label: 'Specialkost',
			isOpen: true,
			props: { activeFilterCount: 0, filterFunction: (recipes) => recipes, onReset: () => {} },
			component: PreferencesSection
		}
	]);

	$effect(() => {
		activeFilterCount = sections.reduce((acc, curr) => acc + curr.props.activeFilterCount, 0);
		filterFunction = (recipes: Recipe[]) => {
			sections.forEach((section) => {
				recipes = section.props.filterFunction(recipes);
			});
			return recipes;
		};
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
			onclick={() => {
				sections.forEach((section) => {
					section.props.onReset();
				});
			}}
		>
			<IconRestore />
			Återställ alla
		</button>
	</div>
	{#each sections as section}
		<details bind:open={section.isOpen} class="group">
			<summary class="flex cursor-pointer items-center py-2">
				<h3 class="text-lg font-medium">{section.label}</h3>
				<div class="ml-auto">
					<IconChevronDown class="transition-transform group-open:rotate-180" />
				</div>
			</summary>
			<div class="space-y-4 pb-6 pt-2">
				<section.component
					bind:activeFilterCount={section.props.activeFilterCount}
					bind:filterFunction={section.props.filterFunction}
					bind:onReset={section.props.onReset}
				/>
			</div>
		</details>
	{/each}
</div>
