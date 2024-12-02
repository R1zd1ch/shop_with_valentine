import ReviewsMain from '@/components/catalog/item-card/ReviewsPage/ReviewsMain'
import { SearchParams } from 'next/dist/server/request/search-params'

const ItemCard = async ({ params }: { params: SearchParams }) => {
	const { itemId } = await params
	const productId = itemId as string
	console.log(await params)
	return (
		<>
			<ReviewsMain productId={productId}></ReviewsMain>
		</>
	)
}

export default ItemCard
