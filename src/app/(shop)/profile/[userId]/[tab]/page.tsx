import PurchaseHistory from '@/components/profile/PurchaseHistory'

type PageParams = Promise<{ tab: string }>

const Page = async ({ params }: { params: PageParams }) => {
	const { tab } = await params
	console.log(await params)

	let content
	switch (tab) {
		case 'purchase-history':
			content = <PurchaseHistory />
			break
		default:
			content = <div>Page not found</div>
	}

	return <div>{content}</div>
}

export default Page
