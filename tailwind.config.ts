import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import exposeColors from '@tailwind-plugin/expose-colors';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Work Sans Variable', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				base: colors.neutral,
				primary: colors.neutral
			}
		}
	},

	plugins: [
		typography,
		forms,
		containerQueries,
		exposeColors({
			prefix: '--tw',
			extract: ['base', 'primary'],
			mode: 'rgb'
		})
	]
} satisfies Config;
