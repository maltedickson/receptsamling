<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>{data.recipe.title}</h1>

{@html data.recipe.content}
