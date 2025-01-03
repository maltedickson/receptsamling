import recipes from '$lib/server/recipes';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = recipes.find((recipe) => recipe.slug === params.slug);
	if (recipe === undefined) {
		return error(404, 'Receptet kunde inte hittas');
	}
	return {
		recipe: recipe
	};
};
