import recipes from '$lib/recipes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		recipes: recipes
	};
};

// import matter from 'gray-matter';
// import { z } from 'zod';
// import markdownit from 'markdown-it';
// import type { PageServerLoad } from './$types';

// const dataSchema = z.object({
// 	title: z.string()
// });

// export const load: PageServerLoad = async () => {
// 	const md = markdownit();
// 	const recipes = Object.entries(
// 		import.meta.glob('/src/lib/recipes/*.md', {
// 			eager: true,
// 			query: '?raw',
// 			import: 'default'
// 		})
// 	).map(([path, content]) => {
// 		const file = matter(content);
// 		return {
// 			slug: path.split('/').pop()!.replace('.md', ''),
// 			content: md.render(file.content),
// 			...dataSchema.parse(file.data)
// 		};
// 	});
// 	return { recipes: recipes };
// };
