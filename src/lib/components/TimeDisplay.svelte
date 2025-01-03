<script lang="ts">
	import type { ActiveTime, TotalTime } from '$lib/recipe';
	import IconPlus from '~icons/tabler/plus';
	import TimeCircle from '$lib/components/TimeCircle.svelte';

	let { activeTime, totalTime }: { activeTime: ActiveTime; totalTime: TotalTime } = $props();
</script>

<div class="flex items-center gap-x-1">
	{#if activeTime === '<1/2'}
		<TimeCircle version="empty-to-half" />
		<TimeCircle version="empty" />
	{:else if activeTime === '1/2-1'}
		<TimeCircle version="half-to-full" />
		<TimeCircle version="empty" />
	{:else if activeTime === '1-2'}
		<TimeCircle version="full" />
		<TimeCircle version="empty-to-full" />
	{:else}
		<TimeCircle version="full" />
		<TimeCircle version="full" />
	{/if}
	{#if totalTime !== undefined}
		<IconPlus />
	{/if}
</div>
