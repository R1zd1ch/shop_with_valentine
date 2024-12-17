import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Product } from '@/storage/UseProductStore'
import Image from 'next/image'

const ProductCard = ({ product }: { product: Product }) => {
	const renderAttributes = () => {
		if (
			product.attributes.requirements &&
			Object.keys(product.attributes.requirements).length > 0
		) {
			return Object.entries(product.attributes.requirements).map(
				([key, value]) => (
					<li key={key}>
						<span className='font-medium capitalize'>{key}:</span>{' '}
						{typeof value === 'object' ? JSON.stringify(value) : value}
					</li>
				)
			)
		} else if (
			product.attributes.others &&
			Array.isArray(product.attributes.others) &&
			product.attributes.others.length > 0
		) {
			return product.attributes.others.map(item => (
				<li key={item.id || item.key}>
					<span className='font-medium capitalize'>{item.key}:</span>{' '}
					{item.value}
				</li>
			))
		} else if (
			product.attributes &&
			Object.keys(product.attributes).length > 0
		) {
			return Object.entries(product.attributes).map(([key, value]) => (
				<li key={key}>
					<span className='font-medium capitalize'>{key}:</span>{' '}
					{typeof value === 'object' ? JSON.stringify(value) : value}
				</li>
			))
		}
		return <li>No attributes available</li>
	}

	const validateImageUrl = (url: string) => {
		try {
			return new URL(url).toString()
		} catch {
			return 'https://via.placeholder.com/500x400'
		}
	}

	return (
		<Card className='flex flex-col md:flex-row p-4 shadow-md'>
			<CardHeader className='w-full md:w-1/3'>
				{product.img && product.img.length > 0 ? (
					<Image
						src={validateImageUrl(product.img[0])}
						width={500}
						height={500}
						alt={product.name}
						className='rounded-md object-cover w-full'
					/>
				) : (
					<div className='w-[150px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center'>
						<span>No Image</span>
					</div>
				)}
			</CardHeader>

			<CardContent className='flex-1 p-4'>
				<h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
				<p className='text-gray-500 mb-4'>{product.description}</p>

				<div className='mb-4'>
					<p className='text-sm'>
						<span className='font-semibold'>Category:</span> {product.category}
					</p>
					<p className='text-sm'>
						<span className='font-semibold'>Price:</span> ${product.price}
					</p>
					{product.oldPrice && (
						<p className='text-sm text-red-500'>
							<span className='line-through'>
								Old Price: ${product.oldPrice}
							</span>
						</p>
					)}
					<p className='text-sm'>
						<span className='font-semibold'>Stock:</span>{' '}
						{product.stockQuantity}
					</p>
				</div>

				<div className='border-t pt-2'>
					<h4 className='text-sm font-semibold mb-2'>Attributes:</h4>
					<ul className='text-sm space-y-1'>{renderAttributes()}</ul>
				</div>
			</CardContent>

			<CardFooter className='flex flex-col justify-between items-end p-4'>
				<div>Здесь будут кнопки</div>
				<p className='text-sm text-gray-600 mt-auto'>
					<span className='font-semibold'>Orders:</span>{' '}
					{product.orderCount || 0}
				</p>
			</CardFooter>
		</Card>
	)
}

export default ProductCard
