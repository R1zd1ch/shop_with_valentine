'use client'

import ProductGallery from './PhotosItemCard'
import BackButton from '@/components/ui/BackButton'
import useProductStore from '@/storage/UseProductStore'
import { Product } from '@/storage/UseProductStore'
import InformationCard from './InformationCard'

import FooterCard from './FooterCard'

const MainItemCard = ({ productId }: { productId: string }) => {
	const idForFind = parseInt(productId)
	const product: Product = useProductStore(state =>
		state.getProductById(idForFind)
	)

	return (
		<div className='md:mx-[100px] flex flex-col gap-6 items-center '>
			<div className='w-full max-w-screen-2xl flex flex-col md:grid lg:grid-cols-2 gap-6 relative'>
				<BackButton
					className='absolute top-0 left-0'
					variant='ghost'
					pushUrl='/catalog'
				></BackButton>
				<div className='col-span-1'>
					<ProductGallery
						images={[
							'https://via.placeholder.com/600x400',
							'https://via.placeholder.com/600x600',
							'https://via.placeholder.com/600x500',
						]}
						// images={product.img.split(',')}
					></ProductGallery>
				</div>
				<div className='flex flex-1'>
					<InformationCard product={product}></InformationCard>
				</div>
				<div className='col-span-2'>
					<FooterCard product={product}></FooterCard>
				</div>
			</div>
		</div>
	)
}

export default MainItemCard
