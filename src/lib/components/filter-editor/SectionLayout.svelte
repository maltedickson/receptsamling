<script lang="ts">
	import { SessionState } from '$lib/session-state.svelte';
	import { type Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import IconChevronDown from '~icons/tabler/chevron-down';
	let {
		label,
		openByDefault,
		activeFilterCount,
		children
	}: { label: string; openByDefault: boolean; activeFilterCount: number; children: Snippet } =
		$props();
	let isOpen = new SessionState(`filter-section-${label}-io`, openByDefault);
</script>

<details bind:open={isOpen.value} class="group">
	<summary class="flex cursor-pointer items-center py-3">
		<h3 class="relative text-lg font-medium">
			<div class="text-lg leading-none">
				{label}
			</div>
			{#if !isOpen.value && activeFilterCount > 0}
				<div
					class="absolute left-full top-0 -translate-y-1 translate-x-1 rounded-3xl border border-base-400 px-1 text-xs leading-tight"
					transition:scale={{ duration: 150 }}
				>
					{activeFilterCount}
				</div>
			{/if}
		</h3>
		<div class="ml-auto">
			<IconChevronDown class="transition-transform group-open:rotate-180" />
		</div>
	</summary>
	<div class="space-y-4 pb-6 pt-2">
		{@render children()}
	</div>
</details>
