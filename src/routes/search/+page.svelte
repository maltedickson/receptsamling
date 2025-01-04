<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import TopBarIcon from '$lib/components/TopBarIcon.svelte';
	import IconArrowLeft from '~icons/tabler/arrow-left';

	let inputText = $state('');

	function handleSubmit() {}
</script>

<TopBar>
	<div class="grid grid-cols-[2.5rem_1fr_2.5rem] gap-x-2">
		<a class="col-start-1" href="/">
			<TopBarIcon>
				<IconArrowLeft />
			</TopBarIcon>
		</a>
		<form
			class="col-start-2 col-end-4 w-full max-w-lg justify-self-center md:col-end-3"
			onsubmit={handleSubmit}
		>
			<input
				bind:value={inputText}
				oninput={(e) => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				type="search"
				class="w-full rounded border-base-200"
				placeholder="Sök recept..."
			/>
		</form>
	</div>
</TopBar>

<div class="flex-grow p-4">
	<div class="mx-auto max-w-lg">
		<!-- <RecipeList recipes={sorted()} /> -->
	</div>
</div>
