import matter from 'gray-matter';
import { recipeDataSchema } from '$lib/recipe';
import markdownit from 'markdown-it';

const md = markdownit();

const recipes = Object.entries(
	import.meta.glob('/src/lib/recipes/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	})
).map(([path, content]) => {
	const file = matter(content);
	return {
		slug: path.split('/').pop()!.replace('.md', ''),
		content: md.render(file.content),
		...recipeDataSchema.parse(file.data)
	};
});

export default recipes;
