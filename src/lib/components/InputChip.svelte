<script lang="ts">
	import type { Snippet } from 'svelte';
	import IconX from '~icons/tabler/x';
	let { onRemove, children }: { onRemove: () => void; children: Snippet } = $props();
</script>

<div class="flex items-center rounded border bg-base-200 leading-tight">
	<div class="flex-grow py-1 pl-2">{@render children()}</div>
	<button onclick={onRemove} class="rounded-full p-1 text-xs active:bg-base-300">
		<IconX />
	</button>
</div>
