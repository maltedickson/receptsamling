<script lang="ts">
	import Star from '$lib/components/Star.svelte';

	let { rating }: { rating: number } = $props();
</script>

<div class="flex text-yellow-500" title={`${Math.round(rating * 100) / 100}`}>
	{#each [0, 1, 2] as i}
		<Star {rating} {i} />
	{/each}
</div>
