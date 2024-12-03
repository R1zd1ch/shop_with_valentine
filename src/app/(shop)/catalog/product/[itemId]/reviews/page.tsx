import ReviewsMain from '@/components/catalog/item-card/ReviewsPage/ReviewsMain'

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
			<ReviewsMain productId={productId}></ReviewsMain>
		</>
	)
}

export default ItemCard
