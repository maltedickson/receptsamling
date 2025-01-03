import recipes from '$lib/server/recipes';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = recipes.find((recipe) => recipe.slug === params.slug);
	if (recipe === undefined) {
		return error(404, 'Receptet kunde inte hittas');
	}
	return {
		recipe: recipe
	};
};

export const entries: EntryGenerator = () => {
	return recipes.map((recipe) => {
		return { slug: recipe.slug };
	});
};

export const prerender = true;
