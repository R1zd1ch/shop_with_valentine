import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'

const products = [
	{
		id: 1,
		name: 'Wireless Headphones',
		price: '$99.99',
		discount: '20%',
		image: '/images/headphones.jpg',
	},
	{
		id: 2,
		name: 'Smart Watch',
		price: '$199.99',
		discount: '15%',
		image: '/images/smartwatch.jpg',
	},
	{
		id: 3,
		name: 'iPhone 14 Pro',
		price: '$1099',
		discount: '30%',
		image: '/images/iphone.jpg',
	},
	{
		id: 4,
		name: 'Nintendo Switch OLED',
		price: '$349',
		discount: '25%',
		image: '/images/nintendo.jpg',
	},
]

const MainStock = () => {
	return (
		<Card className='px-2 sm:px-6 py-8 rounded-lg shadow-lg bg-muted/10'>
			<div className='flex justify-between items-start mb-6 flex-col sm:flex-row sm:items-center'>
				<h2 className='text-3xl font-bold text-card-foreground '>
					Горячие предложения
				</h2>
				<Link
					href='/sale'
					className='transition hover:text-primary text-muted-foreground font-bold text-base'
				>
					Посмотреть все
				</Link>
			</div>
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6'>
				{products.map(product => (
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
						<CardContent className='px-4 mt-2'>
							<h3 className='text-lg font-semibold text-card-foreground line-clamp-2'>
								{product.name}
							</h3>
							<div className='flex gap-2 items-center mt-2'>
								<p className='text-lg text-muted-foreground'>{product.price}</p>
								<span className='text-sm text-destructive font-semibold'>
									-{product.discount}
								</span>
							</div>
						</CardContent>
						{/* Action Button */}
						<CardFooter className='px-4 pb-4 pt-0'>
							<Button className='w-full'>К товару</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</Card>
	)
}

export default MainStock
