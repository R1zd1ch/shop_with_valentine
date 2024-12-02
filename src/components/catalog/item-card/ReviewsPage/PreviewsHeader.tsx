import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/storage/UseProductStore'
import Image from 'next/image'
import calculateAverageRating from '@/lib/calculateAverageRating'
import { Rating } from '@smastrom/react-rating'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import '@smastrom/react-rating/style.css'

const PreviewsHeader = ({ product }: { product: Product }) => {
	const { getReviewsByProductId } = useReviewStore()
	const reviews = getReviewsByProductId(product.id)
	const averageRating = calculateAverageRating(reviews).toFixed(1)

	return (
		<Card className='shadow-lg shadow-black/20  flex flex-col lg:flex-row items-center justify-between p-4 gap-2'>
			<div className='flex flex-row gap-2'>
				<div className='w-24 h-24 aspect-square rounded-md'>
					<Image
						src={typeof product.img === 'string' ? product.img : product.img[0]}
						width={500}
						height={500}
						alt={product.name}
						className='w-full h-full object-cover rounded-md'
					></Image>
				</div>
				<CardHeader className='flex flex-col justify-start gap-0 p-2 '>
					<CardTitle>{product.name}</CardTitle>
					<div className='flex flex-row gap-2 text-sm'>
						<p>{product.category}</p>
						<p>·</p>
						<p>{product.color}</p>
					</div>
					<div className='flex flex-row gap-2 items-center justify-start'>
						<Rating
							value={parseInt(averageRating)}
							readOnly
							style={{ maxWidth: '100px', width: '100%' }}
							orientation='horizontal'
						></Rating>
						<div className='flex flex-row gap-2 items-end'>
							<p className='text-sm font-normal'>{averageRating}</p>
							<p className='text-xs'>{reviews?.length} оценок</p>
						</div>
					</div>
				</CardHeader>
			</div>
			<CardHeader className='border-t-2 lg:border-t-0 mt-4 lg:mt-0 lg:border-l-2 px-12'>
				<div className='text-primary'>
					<CardTitle>{product.price} ₽</CardTitle>
				</div>
			</CardHeader>
		</Card>
	)
}

export default PreviewsHeader
