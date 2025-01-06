<script lang="ts">
	import InputChips from '$lib/components/InputChips.svelte';
	import { SessionState } from '$lib/session-state.svelte';
	import type { SectionComponentProps } from '../FilterEditor.svelte';
	import IconPlus from '~icons/tabler/plus';

	let {
		allRecipes,
		processRecipes = $bindable(),
		activeFilterCount = $bindable(),
		reset = $bindable()
	}: SectionComponentProps = $props();

	let selectedIngredients = new SessionState<string[]>('filter-exclude-ingredients-si', []);
	let inputText = $state('');
	let notIngredientError = $state(false);
	let alreadyActiveError = $state(false);
	$effect(() => {
		inputText = inputText.trimStart();
		notIngredientError = false;
		alreadyActiveError = false;
	});
	let inputElement: HTMLInputElement;

	processRecipes = (recipes) => {
		return recipes.filter((recipe) => {
			return !selectedIngredients.value.some((selectedIngredient) => {
				const hasIngredient = Object.entries(recipe.ingredients).some(([, list]) =>
					list.some(([inRecipe]) =>
						inRecipe.toLowerCase().includes(selectedIngredient.toLowerCase())
					)
				);
				return hasIngredient;
			});
		});
	};

	$effect(() => {
		activeFilterCount = selectedIngredients.value.length;
	});

	reset = () => {
		selectedIngredients.value = [];
		inputText = '';
	};
</script>

{#if selectedIngredients.value.length > 0}
	<InputChips bind:state={selectedIngredients.value} />
{/if}
<form
	onsubmit={(e) => {
		e.preventDefault();
		inputElement.focus();
		const newIngredient = inputText.trim().toLowerCase();
		const isAlreadyActive = selectedIngredients.value.some(
			(ingredient) => ingredient === newIngredient
		);
		if (isAlreadyActive) {
			alreadyActiveError = true;
			return;
		}
		const isIngredient = allRecipes.some((recipe) =>
			Object.entries(recipe.ingredients).some(([, list]) =>
				list.some(([inRecipe]) => inRecipe.toLowerCase().includes(newIngredient))
			)
		);
		if (!isIngredient) {
			notIngredientError = true;
			return;
		}
		inputText = '';
		selectedIngredients.value.push(newIngredient);
	}}
>
	<div class="flex gap-1">
		<input
			bind:this={inputElement}
			type="text"
			class="h-9 flex-grow rounded border-base-300 text-sm"
			bind:value={inputText}
			placeholder="Lägg till ingrediens..."
			required
		/>
		<button
			class="grid size-9 place-items-center rounded border border-base-300 bg-white"
			type="submit"
		>
			<IconPlus />
		</button>
	</div>
	{#if alreadyActiveError || notIngredientError}
		<div class="mt-2 rounded bg-red-100 px-3 py-2 text-red-500">
			{#if alreadyActiveError}
				Denna ingrediens är redan tillagd.
			{:else}
				Denna ingrediens hittades inte i något recept.
			{/if}
		</div>
	{/if}
</form>
