'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { storeImageUrl } from '@/server/actions/urlAction';

const FormSchema = z.object({
	imageUrl: z.string().min(2, {
		message: 'ImageUrl must be at least 2 characters.',
	}),
});

export function CustomForm({
	setImages,
}: {
	setImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			imageUrl: '',
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const images = await storeImageUrl(data.imageUrl);
		setImages(images);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-2/3 space-y-6'>
				<FormField
					control={form.control}
					name='imageUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Add Image URL</FormLabel>
							<FormControl>
								<Input
									placeholder='image url'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
