<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import IconChevronDown from '~icons/tabler/chevron-down';
	let {
		label,
		openByDefault,
		children
	}: { label: string; openByDefault: boolean; children: Snippet } = $props();
	let isOpen = $state(openByDefault);

	onMount(() => {
		const key = `filter-section-${label}-is-open`;
		const stored = sessionStorage.getItem(key);
		if (stored !== null && stored !== openByDefault.toString()) {
			isOpen = !openByDefault;
		}
		$effect(() => {
			sessionStorage.setItem(key, isOpen.toString());
		});
	});
</script>

<details bind:open={isOpen} class="group">
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
