import recipes from '$lib/server/recipes';

export const load = async () => {
	return {
		recipes: recipes
	};
};
