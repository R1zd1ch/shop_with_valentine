import FavouritesUser from '@/components/profile/Favourites/FavouritesUser'
import PaymentInfoUser from '@/components/profile/PaymentInfo/PaymentInfoUser'
import PurchaseHistory from '@/components/profile/PurchaseHistory/PurchaseHistory'
import ReviewsAndQuestionsUser from '@/components/profile/ReviewsAndQuestions/ReviewsAndQuestionsUser'
import SettingsUser from '@/components/profile/Settings/SettingsUser'

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
