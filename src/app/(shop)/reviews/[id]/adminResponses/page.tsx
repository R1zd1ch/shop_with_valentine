import MainAdminResponses from '../../../../../components/shopReviews/adminReponses/MainAdminResponses'
import { SearchParams } from 'next/dist/server/request/search-params'

const page = async ({ params }: { params: SearchParams }) => {
	const { id } = await params
	const reviewId = id as string
	return <MainAdminResponses reviewId={reviewId}></MainAdminResponses>
}

export default page
