import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';
import { createThirdwebClient, getContract } from 'thirdweb';

const client = createThirdwebClient({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
});

const contract = getContract({
	client,
	chain: binance - testnet,
	address: '0x216Be0EEF70AD8afd6012db6C50A61B191F529C1',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed, please use POST' });
	}

	const {
		body: { name, description, image },
	} = req;
	const sdk = new ThirdwebSDK(
		new ethers.Wallet(
			process.env.WALLET_PRIVATE_KEY as string,
			ethers.getDefaultProvider('https://bsc-testnet-rpc.publicnode.com'),
		),
	);
	const collection = await sdk.getNFTCollection(
		process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS as string,
	);
	const signature = await collection.signature.generate({
		metadata: {
			name: name,
			description: description,
			image: image,
		},
	});

	res.json({ message: 'signature generated!', signature });
}
