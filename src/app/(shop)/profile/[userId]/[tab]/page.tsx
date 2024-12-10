import FavouritesUser from '@/components/shop/profile/Favourites/FavouritesUser'
import PaymentInfoUser from '@/components/shop/profile/PaymentInfo/PaymentInfoUser'
import PurchaseHistory from '@/components/shop/profile/PurchaseHistory/PurchaseHistory'
import ReviewsAndQuestionsUser from '@/components/shop/profile/ReviewsAndQuestions/ReviewsAndQuestionsUser'
import SettingsUser from '@/components/shop/profile/Settings/SettingsUser'

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
			content = <SettingsUser userId={parsedUserId}></SettingsUser>
			break

		case 'payment-info':
			content = <PaymentInfoUser></PaymentInfoUser>
			break

		case 'reviews':
			content = <ReviewsAndQuestionsUser></ReviewsAndQuestionsUser>
			break

		default:
			content = <div>Page not found</div>
	}

	return <div>{content}</div>
}

export default Page
