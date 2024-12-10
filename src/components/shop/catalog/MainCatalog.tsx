'use client'
import { FC } from 'react'
import CatalogList from './CatalogList'
import CatalogFilter from './CatalogFilter'
// import useProductStore from '@/storage/UseProductStore'

const MainCatalog: FC = ({}) => {
	// const { fetchProducts } = useProductStore()
	// useEffect(() => {
	// 	fetchProducts()
	// 	const getProductsFromApi = async () => {
	// 		const response = await fetch('/api/products/getAllProducts')
	// 		const data = await response.json()
	// 		console.log(data)
	// 	}
	// 	getProductsFromApi()
	// }, [])

	return (
		<div className='lg:mx-[100px] flex flex-col gap-6 items-center'>
			<div className='grid grid-cols-1 lg:grid-cols-4 gap-10 w-full max-w-screen-2xl'>
				{/* Фильтр */}
				<div className='lg:col-span-1 order-none lg:order-1'>
					<CatalogFilter />
				</div>

				{/* Лист каталога */}
				<div className='lg:col-span-3 order-1 lg:order-none '>
					<CatalogList />
				</div>
			</div>
		</div>
	)
}

export default MainCatalog
