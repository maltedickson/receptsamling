<script lang="ts">
	import FilterChip from './FilterChip.svelte';

	let { selection = $bindable() }: { selection: Record<string, boolean> } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each Object.keys(selection) as label}
		<FilterChip isActive={selection[label]} onToggle={() => (selection[label] = !selection[label])}
			>{label}</FilterChip
		>
	{/each}
</div>
