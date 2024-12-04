import FavouritesUser from '@/components/profile/Favourites/FavouritesUser'
import PurchaseHistory from '@/components/profile/PurchaseHistory/PurchaseHistory'

type PageParams = Promise<{ tab: string; userId: string }>

const Page = async ({ params }: { params: PageParams }) => {
	const { tab, userId } = await params
	console.log(await params)
	const parsedUserId = parseInt(userId)

	let content
	switch (tab) {
		case 'purchase-history':
			content = <PurchaseHistory />
			break

		case 'favorites':
			content = <FavouritesUser userId={parsedUserId}></FavouritesUser>
			break

		case 'settings':
			content = <div>Settings</div>
			break

		case 'payment-info':
			content = <div>Payment info</div>
			break

		case 'reviews':
			content = <div>Reviews</div>
			break

		default:
			content = <div>Page not found</div>
	}

	return <div>{content}</div>
}

export default Page
