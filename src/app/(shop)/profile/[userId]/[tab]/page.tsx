import { FC } from 'react'
import PurchaseHistory from '@/components/profile/PurchaseHistory'

interface PageProps {
	params: { tab: string }
}

const Page: FC<PageProps> = async ({ params }) => {
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
