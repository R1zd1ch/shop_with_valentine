import MainItemCard from '@/components/catalog/item-card/MainItemCard'
import { SearchParams } from 'next/dist/server/request/search-params'

const ItemCard = async ({ params }: { params: SearchParams }) => {
	const { itemId } = await params
	const productId = itemId as string
	return (
		<>
			<MainItemCard productId={productId}></MainItemCard>
		</>
	)
}

export default ItemCard
