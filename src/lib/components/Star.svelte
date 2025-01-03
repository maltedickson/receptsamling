<script lang="ts">
	import IconStar from '~icons/tabler/star';
	import IconStarHalfFilled from '~icons/tabler/star-half-filled';
	import IconStarFilled from '~icons/tabler/star-filled';
	let { rating, i }: { rating: number; i: number } = $props();

	const rounded = Math.round(rating * 2) / 2;
</script>

{#if rounded <= i}
	<IconStar />
{:else if rounded === i + 0.5}
	<IconStarHalfFilled />
{:else}
	<IconStarFilled />
{/if}
