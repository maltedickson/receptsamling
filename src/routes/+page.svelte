<script lang="ts">
	import BrowsePage from '$lib/components/BrowsePage.svelte';

	let { data } = $props();
</script>

<BrowsePage recipes={data.recipes} />
