<script lang="ts">
	import FilterChip from './FilterChip.svelte';

	let { state = $bindable() }: { state: Record<string, boolean> } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each Object.keys(state) as label}
		<FilterChip bind:isActive={state[label]}>{label}</FilterChip>
	{/each}
</div>
