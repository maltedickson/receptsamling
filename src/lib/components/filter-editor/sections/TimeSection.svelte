<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
	import { activeTimeList, activeTimeToString } from '$lib/recipe';
	import { SessionState } from '$lib/session-state.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';

	let {
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	let activeTimePos = new SessionState('filters-time-at', 0);
	let totalTimePos = new SessionState('filters-time-tt', 0);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			const doesActiveTimePass =
				activeTimePos.value <= activeTimeList.findIndex((value) => recipe.activeTime == value);
			const doesTotalTimePass =
				recipe.totalTime === undefined ||
				recipe.totalTime <= [Infinity, 24, 12, 6, 3, 1, 0][totalTimePos.value];
			return doesActiveTimePass && doesTotalTimePass;
		});
	};

	$effect(() => {
		let count = 0;
		if (activeTimePos.value !== 0) {
			count++;
		}
		if (totalTimePos.value !== 0) {
			count++;
		}
		activeFilterCount = count;
	});

	reset = () => {
		activeTimePos.value = 0;
		totalTimePos.value = 0;
	};
</script>

<Slider
	label="Aktiv tid (maxgräns, h)"
	bind:value={activeTimePos.value}
	labels={activeTimeList.map((activeTime) => activeTimeToString(activeTime))}
/>
<Slider
	label="Total tid (maxgräns, h)"
	bind:value={totalTimePos.value}
	labels={['∞', '24', '12', '6', '3', '1', '-']}
/>
