import { useState } from 'react'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import QuestionCard from './QuestionsCard'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

const QuestionsList = ({ productId }: { productId: string }) => {
	const { getQuestionsByProductId } = useQuestionStore()
	const questions = getQuestionsByProductId(parseInt(productId)) || []

	const itemsPerPage = 5
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(questions.length / itemsPerPage)

	const paginatedReviews = questions.slice(
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
					{paginatedReviews.map(question => (
						<QuestionCard key={question.id} question={question} />
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

export default QuestionsList
