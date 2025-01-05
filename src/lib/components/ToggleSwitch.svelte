<script lang="ts">
	let { id, value = $bindable() }: { id: string; value: boolean } = $props();
</script>

<label for={id} class="label">
	<input type="checkbox" name="" {id} bind:checked={value} class="input" />
	<div class="slider"></div>
</label>

<style>
	.label {
		--slider-size: 1em;
		--extra-width: var(--slider-size);
		--border-size: 0.2em;
		--bg-color: rgb(var(--tw-base-400));
	}

	.label:has(.input:checked) {
		--bg-color: rgb(var(--tw-primary-500));
	}

	.label {
		@apply relative box-content inline-block cursor-pointer;
		width: calc(var(--slider-size) + var(--extra-width));
		height: var(--slider-size);
		border: var(--border-size) solid var(--bg-color);
		background-color: var(--bg-color);
		border-radius: calc(var(--slider-size) / 2 + var(--border-size));
	}

	.label .input {
		@apply size-0 opacity-0;
	}

	.slider {
		width: var(--slider-size);
		height: var(--slider-size);
		@apply absolute left-0 top-0 rounded-full bg-white transition-[left];
	}

	.input:checked + .slider {
		left: var(--extra-width);
	}

	.label:has(.input:focus-visible) {
		@apply ring ring-offset-1;
	}
</style>
