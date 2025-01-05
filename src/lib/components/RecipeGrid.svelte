<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import RecipeCard from './RecipeCard.svelte';
	import { flip } from 'svelte/animate';
	let { recipes }: { recipes: Recipe[] } = $props();
</script>

<div
	class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] items-start justify-items-center gap-4 md:gap-6"
>
	{#each recipes as recipe (recipe.slug)}
		<div animate:flip={{ duration: 150 }}>
			<RecipeCard {recipe} />
		</div>
	{/each}
</div>
