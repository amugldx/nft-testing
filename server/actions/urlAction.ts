'use server';

import { revalidatePath } from 'next/cache';
const imageUrlStorage: string[] = [];

export const storeImageUrl = async (imageUrl: string) => {
	imageUrlStorage.push(imageUrl);
	revalidatePath('/');
	return imageUrlStorage;
};
