import QuestionsMain from '@/components/catalog/item-card/QuestionsPage/QuestionsMain'

const ItemCard = async ({
	params,
}: {
	params: Promise<{ itemId: string }>
}) => {
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
