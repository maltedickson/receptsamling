<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
	import { activeTimeList, activeTimeToString } from '$lib/recipe';
	import { SessionState } from '$lib/session-state.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';

	let {
		allRecipes,
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	let activeTimeIdx = new SessionState('filters-time-at', 0);
	let totalTimeIdx = new SessionState('filters-time-tt', 0);

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			// Active Time
			const timeIndex = activeTimeList.findIndex((value) => recipe.activeTime == value);
			if (activeTimeIdx.value > timeIndex) {
				return false;
			}
			// Total Time
			const totalTimeMaxes = [Infinity, 24, 12, 6, 3, 1, 0];
			const maxTotalTime = totalTimeMaxes[totalTimeIdx.value];
			if (recipe.totalTime !== undefined && recipe.totalTime > maxTotalTime) {
				return false;
			}
			return true;
		});
	};

	$effect(() => {
		let count = 0;
		if (activeTimeIdx.value !== 0) {
			count++;
		}
		if (totalTimeIdx.value !== 0) {
			count++;
		}
		activeFilterCount = count;
	});

	reset = () => {
		activeTimeIdx.value = 0;
		totalTimeIdx.value = 0;
	};
</script>

<Slider
	label="Aktiv tid (maxgräns, h)"
	bind:value={activeTimeIdx.value}
	labels={activeTimeList.map((activeTime) => activeTimeToString(activeTime))}
/>
<Slider
	label="Total tid (maxgräns, h)"
	bind:value={totalTimeIdx.value}
	labels={['∞', '24', '12', '6', '3', '1', '-']}
/>
