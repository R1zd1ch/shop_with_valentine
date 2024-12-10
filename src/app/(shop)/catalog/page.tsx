import { FC } from 'react'
import MainCatalog from '@/components/shop/catalog/MainCatalog'
import { getProducts } from '@/utils/fetchProducts'

const page: FC = async ({}) => {
	const products = await getProducts()

	console.log(products)
	return <MainCatalog></MainCatalog>
}

export default page
