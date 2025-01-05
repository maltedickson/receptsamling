<script lang="ts">
	let {
		value = $bindable(),
		labels,
		step,
		label
	}: {
		value: number;
		labels: string[];
		step?: number;
		label?: string;
	} = $props();

	const progress = $derived((value / (labels.length - 1)) * 100);
</script>

<div>
	{#if label !== undefined}
		<h4 class="mb-2 text-sm">{label}</h4>
	{/if}
	<input
		type="range"
		min={0}
		max={labels.length - 1}
		step={step || 1}
		bind:value
		style:--progress={`${progress}%`}
	/>
	<div class="ticks text-sm">
		{#each labels as label}
			<div class="relative">
				<div class="tick"></div>
				<div class="label">{label}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	:root {
		--track-height: 6px;
		--thumb-size: 1rem;

		--left-rgb: var(--tw-base-500);
		--right-rgb: 255, 255, 255;
		--left-color: rgb(var(--left-rgb));
		--right-color: rgb(var(--right-rgb));
	}

	input[type='range'] {
		display: block;
		appearance: none;
		width: 100%;
		cursor: pointer;
		background: linear-gradient(
			to right,
			var(--left-color) var(--progress),
			var(--right-color) var(--progress)
		);
		height: var(--track-height);
		border-radius: calc(var(--track-height) / 2);
		z-index: 1;
		box-shadow: inset 0 0 0 1px rgb(var(--left-rgb), 0.5);
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: var(--thumb-size);
		height: var(--thumb-size);
		background-color: var(--left-color);
		border: none;
		transition: box-shadow 0.2s ease-in-out;
		border-radius: 50%;
	}

	input[type='range']::-moz-range-thumb {
		width: var(--thumb-size);
		height: var(--thumb-size);
		background-color: var(--left-color);
		border: none;
		transition: box-shadow 0.2s ease-in-out;
		border-radius: 50%;
	}

	input[type='range']::-webkit-slider-thumb:hover {
		box-shadow: 0 0 0 0.5rem rgb(var(--left-rgb), 0.2);
	}
	input[type='range']:active::-webkit-slider-thumb {
		box-shadow: 0 0 0 0.625rem rgb(var(--left-rgb), 0.4);
	}
	input[type='range']:focus-visible::-webkit-slider-thumb {
		box-shadow: 0 0 0 0.625rem rgb(var(--left-rgb), 0.4);
	}

	input[type='range']::-moz-range-thumb:hover {
		box-shadow: 0 0 0 0.5rem rgb(var(--left-rgb), 0.2);
	}
	input[type='range']:active::-moz-range-thumb {
		box-shadow: 0 0 0 0.625rem rgb(var(--left-rgb), 0.4);
	}
	input[type='range']:focus-visible::-moz-range-thumb {
		box-shadow: 0 0 0 0.625rem rgb(var(--left-rgb), 0.4);
	}

	.ticks {
		--tick-height: 4px;
		display: flex;
		padding-inline: calc(var(--thumb-size) / 2);
		justify-content: space-between;
		position: relative;
		z-index: -1;
		height: calc(1em + 0.25rem + var(--tick-height));
		line-height: 1;
	}
	.tick {
		width: 1px;
		height: var(--tick-height);
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(-50%);
		background-color: var(--left-color);
	}
	.label {
		position: absolute;
		bottom: 0;
		left: 0;
		transform: translateX(-50%);
		width: max-content;
	}
</style>
