import { Card } from '@/components/ui/card'
import Header from './Header'
import { ProductForm } from './product-form'
import CardPreview from './card-preview/CardPreview'
import { ViewInPage } from '../Buttons'

const Main = ({}) => {
	return (
		<div className='w-full flex flex-col'>
			<Card className='mx-2'>
				<Header></Header>
			</Card>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-2'>
				<Card className='md:col-span-3 min-h-[200px] p-4'>
					<ProductForm></ProductForm>
				</Card>
				<div className='col-span-1 flex flex-col gap-4'>
					<CardPreview></CardPreview>

					<ViewInPage className='w-full'></ViewInPage>
				</div>
			</div>
		</div>
	)
}

export default Main
