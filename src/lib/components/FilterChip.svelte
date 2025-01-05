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
	style:--check-width="0.55rem"
	class={[
		'grid items-center rounded border px-[6px] py-1 leading-tight',
		{
			'grid-cols-[calc(var(--check-width)*2)_1fr] bg-base-200 active:bg-base-300': isActive
		},
		{
			' grid-cols-[var(--check-width)_1fr_var(--check-width)] active:bg-base-200': !isActive
		}
	]}
>
	{#if isActive}
		<div in:scale={{ duration: 150 }}>
			<IconCheck class="text-xs" />
		</div>
	{/if}
	<div class="col-start-2">
		{@render children()}
	</div>
</button>
