import matter from 'gray-matter';
import { recipeDataSchema, type Recipe } from '$lib/recipe';
import markdownit from 'markdown-it';
import type { Picture } from 'vite-imagetools';

const md = markdownit();

const imageModules: Record<string, { default: Picture }> = Object.fromEntries(
	Object.entries(
		import.meta.glob('/src/lib/recipes/*.{png,webp}', {
			eager: true,
			query: { enhanced: true }
		})
	).map(([path, module]) => [path.split('/').pop()!.split('.')[0], module])
) as Record<string, { default: Picture }>;

const recipes: Recipe[] = Object.entries(
	import.meta.glob('/src/lib/recipes/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	})
).map(([path, content]) => {
	const file = matter(content);
	const slug = path.split('/').pop()!.replace('.md', '');
	return {
		slug: slug,
		content: md.render(file.content),
		picture: imageModules[slug].default,
		...recipeDataSchema.parse(file.data)
	};
});

export default recipes;
