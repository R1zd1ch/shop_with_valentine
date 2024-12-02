import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const popularProducts = [
	{
		id: 1,
		name: 'MacBook Pro 14"',
		description: 'Powerful performance with M1 Pro chip.',
		price: '$1999',
		image: '/images/macbook.jpg',
	},
	{
		id: 2,
		name: 'iPhone 14 Pro',
		description: 'Latest smartphone from Apple.',
		price: '$1099',
		image: '/images/iphone.jpg',
	},
	{
		id: 3,
		name: 'Sony WH-1000XM5',
		description: 'Noise-cancelling headphones.',
		price: '$399',
		image: '/images/sony.jpg',
	},
	{
		id: 4,
		name: 'Canon EOS R6',
		description: 'Professional camera for stunning shots.',
		price: '$2499',
		image: '/images/canon.jpg',
	},
	{
		id: 5,
		name: 'Nintendo Switch OLED',
		description: 'Play your favorite games anywhere.',
		price: '$349',
		image: '/images/switch.jpg',
	},
]

const MainPopularItems = () => {
	return (
		<Card className='px-2 sm:px-6 py-8 rounded-lg shadow-lg bg-muted/10'>
			<h2 className='text-3xl font-bold mb-8 text-foreground'>
				Популярные товары
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6'>
				{popularProducts.map(product => (
					<Card
						key={product.id}
						className='relative flex flex-col justify-between h-[350px] rounded-lg bg-card shadow-md overflow-hidden group'
					>
						{/* Product Image */}
						<CardHeader className='relative p-0 w-full h-40'>
							<Image
								src={'https://via.placeholder.com/600x400'}
								alt={product.name}
								width={600}
								height={400}
								className='w-full h-full object-cover'
							/>
						</CardHeader>
						{/* Product Details */}
						<CardContent className='px-4 mt-0 pt-0 pb-0'>
							<h3 className='text-lg font-semibold text-card-foreground line-clamp-2'>
								{product.name}
							</h3>
							<div className='flex gap-2 items-center mt-2'>
								<p className='text-lg text-muted-foreground'>{product.price}</p>
							</div>
						</CardContent>
						{/* Action Button */}
						<CardFooter className='px-4 pb-4 pt-0 mt-0'>
							<Button className='w-full'>К товару</Button>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className='flex justify-center mt-10'>
				<p className='text-center text-base text-muted-foreground hover:text-primary transition duration-300 cursor-pointer font-bold'>
					<Link href={'/catalog'}>Показать все товары...</Link>
				</p>
			</div>
		</Card>
	)
}

export default MainPopularItems
