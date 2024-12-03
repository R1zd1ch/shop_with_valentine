import MainAdminResponses from '../../../../../components/shopReviews/adminReponses/MainAdminResponses'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params
	const reviewId = id as string
	return <MainAdminResponses reviewId={reviewId}></MainAdminResponses>
}

export default page
