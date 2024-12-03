import Link from 'next/link'
import { Card } from '../ui/card'
import StockProductCard from './StockCard'
import useProductStore from '@/storage/UseProductStore'

const MainStock = () => {
	const { products } = useProductStore()
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
				{products.map(
					product =>
						product.discountPrice && (
							<StockProductCard key={product.id} product={product} />
						)
				)}
			</div>
		</Card>
	)
}

export default MainStock
