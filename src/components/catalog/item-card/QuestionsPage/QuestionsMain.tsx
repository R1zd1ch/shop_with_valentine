'use client'
import BackButton from '@/components/ui/BackButton'
import PreviewsHeader from './QuestionsHeader'
import useProductStore from '@/storage/UseProductStore'
import PreviewsButtons from './QuestionsButtons'
import ReviewsList from './QuestionsList'
import { Card } from '@/components/ui/card'
import MainCreateQuestion from '../QuestionModals/CreateQuestion/MainCreateQuestion'

const QuestionsMain = ({ productId }: { productId: string }) => {
	const { getProductById } = useProductStore()
	const parsedId = parseInt(productId)
	const product = getProductById(parsedId)
	return (
		<div className='md:mx-[100px] flex flex-col gap-6 items-center '>
			<div className='w-full max-w-screen-2xl flex flex-col gap-3 relative'>
				<BackButton
					className='absolute -top-5 -left-0 text-foreground '
					variant='link'
					pushUrl={`/catalog/product/${productId}`}
				>
					<p className='font-bold+'>Назад</p>
				</BackButton>
				<div className='w-full flex gap-2 flex-col lg:flex-row'>
					<div className='flex-1'>
						<PreviewsHeader product={product}></PreviewsHeader>
					</div>
					<div className='w-full lg:w-1/4 '>
						<PreviewsButtons></PreviewsButtons>
					</div>
				</div>

				<div className='grid grid-cols-4  gap-2 lg:gap-1'>
					<div className='col-span-4 lg:col-span-1 order-1 lg:order-2 '>
						<Card className='p-4 py-8 flex items-center justify-center'>
							<MainCreateQuestion productId={parsedId}></MainCreateQuestion>
						</Card>
					</div>

					<div className='col-span-4 lg:col-span-3 order-2 lg:order-1 lg:mr-2'>
						<ReviewsList productId={productId}></ReviewsList>
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuestionsMain
