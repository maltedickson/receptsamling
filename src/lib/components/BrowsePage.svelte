<script lang="ts">
	import type { Recipe } from '$lib/recipe';
	import { onMount } from 'svelte';
	import RecipeGrid from './RecipeGrid.svelte';
	import IconFilter from '~icons/tabler/filter';
	import IconSearch from '~icons/tabler/search';
	import IconX from '~icons/tabler/x';

	let { recipes }: { recipes: Recipe[] } = $props();

	let isSidebarOpen = $state(false);
	const KEY_PREFIX = 'browse-page-';
	const KEYS = {
		isSidebarOpen: `${KEY_PREFIX}is-sidebar-open`
	};

	onMount(() => {
		sessionStorage.setItem('all-recipes-view', 'browse');

		if (sessionStorage.getItem(KEYS.isSidebarOpen) === 'true') {
			isSidebarOpen = true;
		}
		$effect(() => {
			sessionStorage.setItem(KEYS.isSidebarOpen, isSidebarOpen.toString());
		});
	});

	function getScrollbarWidth(): number {
		if (typeof document === 'undefined') {
			return 0;
		}
		const outer = document.createElement('div');
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'scroll';
		document.body.appendChild(outer);

		const inner = document.createElement('div');
		outer.appendChild(inner);

		const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
		outer.parentNode!.removeChild(outer);
		return scrollbarWidth;
	}

	function openSidebar() {
		isSidebarOpen = true;
	}
	function closeSidebar() {
		isSidebarOpen = false;
	}

	$effect(() => {
		if (typeof document === 'undefined') {
			return;
		}
		if (isSidebarOpen) {
			document.body.classList.add('overflow-y-hidden', 'lg:overflow-y-auto');
		} else {
			document.body.classList.remove('overflow-y-hidden', 'lg:overflow-y-auto');
		}
	});
</script>

<div style:--sidebar-width="20rem">
	<button
		aria-label="close sidebar"
		class={[
			'fixed inset-0 z-50 bg-black/70 opacity-0 transition-opacity lg:hidden',
			{ 'opacity-100': isSidebarOpen }
		]}
		inert={!isSidebarOpen}
		onclick={closeSidebar}
	></button>

	<div
		class={[
			'bg-base-100 fixed bottom-0 left-0 top-0 z-50 w-80 -translate-x-full overflow-y-auto p-4 shadow-lg transition-transform',
			{ 'translate-x-0': isSidebarOpen }
		]}
	>
		<button
			aria-label="close"
			onclick={closeSidebar}
			class="absolute right-2 top-2 grid size-10 place-items-center text-xl"
		>
			<IconX />
		</button>
	</div>

	<div
		style:--scrollbar-width={`${getScrollbarWidth()}px`}
		class={['transition-[padding-left]', { 'lg:pl-[var(--sidebar-width)]': isSidebarOpen }]}
	>
		<div>
			<div
				class={[
					'grid grid-cols-[1fr_auto_1fr]',
					{ 'pr-[var(--scrollbar-width)] lg:pr-0': isSidebarOpen }
				]}
			>
				<button onclick={openSidebar} class="text-xl">
					<IconFilter />
				</button>
				<h1 class="text-center font-semibold leading-tight">
					Familjens<br />receptsamling
				</h1>
				<button class="ml-auto text-xl">
					<IconSearch />
				</button>
			</div>
		</div>
		<div class="main-content">
			<RecipeGrid {recipes} />
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: rgb(var(--tw-base-100));
	}
</style>
