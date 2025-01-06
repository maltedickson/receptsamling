<script lang="ts">
	import { onMount } from 'svelte';
	import RecipeGrid from '$lib/components/RecipeGrid.svelte';
	import IconFilter from '~icons/tabler/filter';
	import IconSearch from '~icons/tabler/search';
	import IconX from '~icons/tabler/x';
	import TopBar from '$lib/components/TopBar.svelte';
	import TopBarIcon from '$lib/components/TopBarIcon.svelte';
	import FilterEditor from '$lib/components/filter-editor/FilterEditor.svelte';
	import { SessionState } from '$lib/session-state.svelte.js';

	let { data } = $props();

	let isSidebarOpen = new SessionState('browse-page-iso', false);

	onMount(() => {
		sessionStorage.setItem('all-recipes-view', 'browse');
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
		isSidebarOpen.value = true;
	}
	function closeSidebar() {
		isSidebarOpen.value = false;
	}

	$effect(() => {
		if (typeof document === 'undefined') {
			return;
		}
		if (isSidebarOpen.value) {
			document.body.classList.add('overflow-y-hidden', 'lg:overflow-y-auto');
		} else {
			document.body.classList.remove('overflow-y-hidden', 'lg:overflow-y-auto');
		}
	});

	let filteredRecipes = $state(data.recipes);
	let activeFilterCount = $state(0);
</script>

<svelte:head>
	<title>Familjens receptsamling</title>
	<style>
		body {
			background-color: rgb(var(--tw-base-100));
		}
	</style>
</svelte:head>

<div style:--sidebar-width="20rem">
	<button
		aria-label="close sidebar"
		class={[
			'fixed inset-0 z-50 bg-black/70 opacity-0 transition-opacity lg:hidden',
			{ 'opacity-100': isSidebarOpen.value }
		]}
		inert={!isSidebarOpen.value}
		onclick={closeSidebar}
	></button>

	<div
		class={[
			'fixed bottom-0 left-0 top-0 z-50 w-80 -translate-x-full overflow-y-auto bg-base-100 p-4 shadow-lg transition-transform',
			{ 'translate-x-0': isSidebarOpen.value }
		]}
	>
		<button
			aria-label="close"
			onclick={closeSidebar}
			class="absolute right-2 top-2 grid size-10 place-items-center text-xl"
		>
			<IconX />
		</button>
		<FilterEditor allRecipes={data.recipes} bind:filteredRecipes bind:activeFilterCount />
	</div>

	<div
		style:--scrollbar-width={`${getScrollbarWidth()}px`}
		class={['transition-[padding-left]', { 'lg:pl-[var(--sidebar-width)]': isSidebarOpen.value }]}
	>
		<TopBar>
			<div
				class={[
					'grid grid-cols-[1fr_auto_1fr]',
					{ 'pr-[var(--scrollbar-width)] lg:pr-0': isSidebarOpen.value }
				]}
			>
				<div
					class={[
						'col-start-1 flex items-center gap-1 transition-opacity',
						{ 'opacity-50': isSidebarOpen.value }
					]}
				>
					<button onclick={openSidebar} id="open-sidebar-button">
						<TopBarIcon>
							<IconFilter />
						</TopBarIcon>
					</button>
					{#if activeFilterCount > 0}
						<label for="open-sidebar-button" class="text-sm leading-tight">
							{activeFilterCount} filter aktiv{#if activeFilterCount === 1}t{:else}a{/if}
						</label>
					{/if}
				</div>
				<h1 class="text-center font-semibold leading-tight">
					Familjens<br />receptsamling
				</h1>
				<a class="ml-auto" href="/search/">
					<TopBarIcon>
						<IconSearch />
					</TopBarIcon>
				</a>
			</div>
		</TopBar>
		<div class="p-4 md:p-6">
			<div class={[{ 'pr-[var(--scrollbar-width)] lg:pr-0': isSidebarOpen.value }]}>
				<RecipeGrid recipes={JSON.parse(JSON.stringify(filteredRecipes))} />
			</div>
		</div>
	</div>
</div>
