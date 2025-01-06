<script>
	import { scrollY } from 'svelte/reactivity/window';
</script>

<div
	class={[
		'sticky top-0 z-40 box-content h-10 bg-base-100 px-2 py-2',
		{ 'shadow-md': scrollY.current && scrollY.current > 0 }
	]}
>
	<slot />
</div>
