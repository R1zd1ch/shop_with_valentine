import MainItemCard from '@/components/shop/catalog/item-card/MainItemCard'

type PageParams = Promise<{ itemId: string }>

export default async function ProductPage({ params }: { params: PageParams }) {
	const { itemId } = await params

	return (
		<>
			<MainItemCard productId={itemId} />
		</>
	)
}
