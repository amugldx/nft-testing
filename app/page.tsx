'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { CustomForm } from './_components/customForm';

export default function Home() {
	const [images, setImages] = useState<Array<string>>([]);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');

	async function handleSubmit(event: FormEvent, img: string) {
		event.preventDefault();
	}

	return (
		<div className='m-20'>
			<h1 className='text-4xl font-bold'>Mint and Deploy Testing</h1>
			<div className='mt-20'>
				<CustomForm setImages={setImages} />
			</div>
			<div className='mt-10 grid grid-cols-4 gap-4'>
				{images?.map(
					img =>
						img !== null && (
							<div
								key={img}
								className='max-w-[300px] p-4 bg-neutral-100 rounded-lg border border-neutral-300'>
								<Image
									src={img}
									alt='image'
									width={300}
									height={300}
								/>
								<div className='mt-4 flex justify-between items-center'>
									<Dialog>
										<DialogTrigger asChild>
											<Button>Mint & Deploy</Button>
										</DialogTrigger>
										<DialogContent className='sm:max-w-[425px]'>
											<DialogHeader>
												<DialogTitle>Mint and Deploy NFT</DialogTitle>
												<DialogDescription>
													Add name and description for your nft below and wait a second.
												</DialogDescription>
											</DialogHeader>
											<div className='grid gap-4 py-4'>
												<div className='grid grid-cols-4 items-center gap-4'>
													<Label
														htmlFor='name'
														className='text-right'>
														Name
													</Label>
													<Input
														id='name'
														value={name}
														onChange={e => setName(e.target.value)}
														className='col-span-3'
													/>
												</div>
												<div className='grid grid-cols-4 items-center gap-4'>
													<Label
														htmlFor='description'
														className='text-right'>
														Description
													</Label>
													<Input
														id='description'
														value={description}
														onChange={e => setDescription(e.target.value)}
														className='col-span-3'
													/>
												</div>
												<div className='grid grid-cols-4 items-center gap-4'>
													<Label
														htmlFor='image'
														className='text-right'>
														Image
													</Label>
													<Input
														id='image'
														value={img}
														disabled={true}
														className='col-span-3'
													/>
												</div>
											</div>
											<DialogFooter>
												<Button
													onClick={(event: FormEvent) => handleSubmit(event, img)}
													type='button'>
													Send It!
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>
							</div>
						),
				)}
			</div>
		</div>
	);
}
