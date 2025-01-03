<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<ul class="space-y-4">
	{#each data.recipes as recipe}
		<li>
			<a href={`/${recipe.slug}`}>{recipe.title}</a>
		</li>
	{/each}
</ul>
