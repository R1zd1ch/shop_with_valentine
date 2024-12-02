import QuestionsMain from '@/components/catalog/item-card/QuestionsPage/QuestionsMain'
import { SearchParams } from 'next/dist/server/request/search-params'

const ItemCard = async ({ params }: { params: SearchParams }) => {
	const { itemId } = await params
	const productId = itemId as string
	console.log(await params)
	return (
		<>
			<QuestionsMain productId={productId}></QuestionsMain>
		</>
	)
}

export default ItemCard
