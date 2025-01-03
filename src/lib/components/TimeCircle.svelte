<script lang="ts">
	let {
		version
	}: {
		version: 'empty' | 'empty-to-half' | 'half-to-full' | 'empty-to-full' | 'full';
	} = $props();
</script>

<div class={['time-circle', version]}>
	<div class="left"></div>
	<div class="right"></div>
</div>

<style>
	.time-circle {
		--dark: rgb(var(--tw-base-600));
		--light: rgb(var(--tw-base-300));
		--size: 17px;
		display: grid;
		width: var(--size);
		height: var(--size);
		grid-template-columns: 1fr 1fr;
		border-radius: 50%;
		border: 2px solid var(--dark);

		.left {
			border-top-left-radius: 9999px;
			border-bottom-left-radius: 9999px;
		}
		.right {
			border-top-right-radius: 9999px;
			border-bottom-right-radius: 9999px;
		}

		&.empty-to-half {
			.left {
				background-color: var(--light);
			}
		}
		&.half-to-full {
			.left {
				background-color: var(--dark);
			}
			.right {
				background-color: var(--light);
			}
		}
		&.empty-to-full {
			.left {
				background-color: var(--light);
			}
			.right {
				background-color: var(--light);
			}
		}
		&.full {
			.left {
				background-color: var(--dark);
			}
			.right {
				background-color: var(--dark);
			}
		}
	}
</style>
