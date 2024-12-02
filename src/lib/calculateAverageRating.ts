/* eslint-disable @typescript-eslint/no-explicit-any */
const calculateAverageRating = (reviews: any[]) => {
	if (reviews.length === 0) return 0
	const total = reviews.reduce((sum, review) => sum + review.rating, 0)
	return total / reviews.length
}

export default calculateAverageRating
