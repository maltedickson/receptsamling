<script lang="ts">
	import { SessionState } from '$lib/session-state.svelte';
	import { type Snippet } from 'svelte';
	import IconChevronDown from '~icons/tabler/chevron-down';
	let {
		label,
		openByDefault,
		children
	}: { label: string; openByDefault: boolean; children: Snippet } = $props();
	let isOpen = new SessionState(`filter-section-${label}-io`, openByDefault);
</script>

<details bind:open={isOpen.value} class="group">
	<summary class="flex cursor-pointer items-center py-2">
		<h3 class="text-lg font-medium">{label}</h3>
		<div class="ml-auto">
			<IconChevronDown class="transition-transform group-open:rotate-180" />
		</div>
	</summary>
	<div class="space-y-4 pb-6 pt-2">
		{@render children()}
	</div>
</details>
