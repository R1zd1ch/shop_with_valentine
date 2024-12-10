'use client'

import ProductGallery from './PhotosItemCard'
import BackButton from '@/components/ui/BackButton'
import useProductStore from '@/storage/UseProductStore'
import { Product } from '@/storage/UseProductStore'
import InformationCard from './InformationCard'
import FooterCard from './FooterCard'

const MainItemCard = ({ productId }: { productId: string }) => {
	const idForFind = parseInt(productId)
	// const product: Product = useProductStore(state =>
	// 	state.getProductById(idForFind)
	// )
	const { getProductById } = useProductStore()
	const product: Product = getProductById(idForFind)
	if (!product) {
		return <div>Product not found</div>
	}

	return (
		<div className='flex flex-col gap-6 items-center md:mx-4 lg:mx-8 xl:mx-[100px]'>
			<div className='w-full max-w-screen-2xl flex flex-col gap-6 relative md:grid md:grid-cols-12'>
				<BackButton
					className='absolute top-0 left-0 '
					variant='ghost'
					pushUrl='/catalog'
				></BackButton>

				<div className='col-span-12 md:col-span-6'>
					<ProductGallery
						images={[
							'https://via.placeholder.com/600x400',
							'https://via.placeholder.com/600x600',
							'https://via.placeholder.com/600x500',
						]}
						// images={product.img.split(',')}
					/>
				</div>

				<div className='col-span-12 md:col-span-6'>
					<InformationCard product={product} />
				</div>

				<div className='col-span-12 mt-6'>
					<FooterCard product={product} />
				</div>
			</div>
		</div>
	)
}

export default MainItemCard
