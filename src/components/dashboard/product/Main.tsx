'use client'
import { Card } from '@/components/ui/card'
import Header from './Header'
import Filter from './Filter'
import List from './List'
import useProductStore from '@/storage/UseProductStore'

const Main = ({}) => {
	const { isLoading, fetchProducts, products } = useProductStore()

	return (
		<div className='w-full flex flex-col'>
			<Card className='mx-2'>
				<Header></Header>
			</Card>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-2'>
				<div className='md:col-span-3 h-[200px]'>
					<List
						isLoading={isLoading}
						products={products}
						fetchProducts={fetchProducts}
					></List>
				</div>
				<div className='col-span-1'>
					<Filter></Filter>
				</div>
			</div>
		</div>
	)
}

export default Main
