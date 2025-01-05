<script lang="ts">
	import { flip } from 'svelte/animate';
	import InputChip from './InputChip.svelte';
	import { fade, fly } from 'svelte/transition';
	let { state = $bindable() }: { state: string[] } = $props();
</script>

<div class="flex flex-wrap gap-2">
	{#each state as text (text)}
		<div animate:flip={{ duration: 150 }} in:fly={{ duration: 150, x: 100 }}>
			<InputChip onRemove={() => state.splice(state.indexOf(text), 1)}>
				{text}
			</InputChip>
		</div>
	{/each}
</div>
