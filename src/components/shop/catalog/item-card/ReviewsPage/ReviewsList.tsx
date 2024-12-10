import { useState } from 'react'
import { useReviewStore } from '@/storage/UseReviewsAndQuestionsStore'
import ReviewsCard from './ReviewsCard'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

const ReviewsList = ({ productId }: { productId: string }) => {
	const { getReviewsByProductId } = useReviewStore()
	const reviews = getReviewsByProductId(parseInt(productId)) || []

	const itemsPerPage = 5
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(reviews.length / itemsPerPage)

	const paginatedReviews = reviews.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className='flex flex-col gap-6'>
			{paginatedReviews.length > 0 ? (
				<div className='flex flex-col gap-3'>
					{paginatedReviews.map(review => (
						<ReviewsCard key={review.id} review={review} />
					))}
				</div>
			) : (
				<p className='text-center '>Отзывов пока нет :(</p>
			)}

			{/* Пагинация */}
			{totalPages > 1 && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href='#'
								onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }, (_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									href='#'
									isActive={index + 1 === currentPage}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						{totalPages > 5 && <PaginationEllipsis />}
						<PaginationItem>
							<PaginationNext
								href='#'
								onClick={() =>
									handlePageChange(Math.min(currentPage + 1, totalPages))
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	)
}

export default ReviewsList
