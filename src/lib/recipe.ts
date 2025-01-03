import { z } from 'zod';

export const mealTypesList = ['frukost', 'förrätt', 'huvudrätt', 'sött', 'tillbehör'] as const;

export const preferencesList = ['vegetarisk', 'vegansk', 'glutenfri'] as const;

export const activeTimeList = ['2+', '1-2', '1/2-1', '<1/2'] as const;

const activeTimeSchema = z.enum(activeTimeList);
const totalTimeSchema = z.number().optional();

export const recipeDataSchema = z.object({
	title: z.string(),
	ratings: z.record(z.string(), z.number()).optional(),
	activeTime: activeTimeSchema,
	totalTime: totalTimeSchema,
	mealTypes: z.array(z.enum(mealTypesList)),
	preferences: z.array(z.enum(preferencesList)).optional(),
	tags: z.array(z.string()).optional(),
	servings: z.number().optional(),
	ingredients: z.record(z.string(), z.array(z.tuple([z.string(), z.string()])))
});

export const recipeSchema = recipeDataSchema.extend({
	slug: z.string(),
	content: z.string()
});

export type ActiveTime = z.infer<typeof activeTimeSchema>;
export type TotalTime = z.infer<typeof totalTimeSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
