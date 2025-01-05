<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import IconCheck from '~icons/tabler/check';
	let {
		isActive,
		onToggle,
		children
	}: { isActive: boolean; onToggle?: () => void; children: Snippet } = $props();
</script>

<button
	onclick={() => {
		if (onToggle !== undefined) {
			onToggle();
		}
	}}
	class={[
		'flex items-center gap-1 rounded border px-2 py-1 leading-tight',
		{
			'bg-base-200 active:bg-base-300': isActive
		},
		{
			' active:bg-base-200': !isActive
		}
	]}
>
	{#if isActive}
		<div in:scale={{ duration: 150 }}>
			<IconCheck class="text-xs" />
		</div>
	{/if}
	<div>
		{@render children()}
	</div>
</button>
