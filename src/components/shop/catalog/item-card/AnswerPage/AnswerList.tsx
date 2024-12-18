import { useState } from 'react'
import { useQuestionStore } from '@/storage/UseReviewsAndQuestionsStore'
import AnswerCard from './AnswerCard'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import MainCreateAnswer from '../AnswerModals/CreateAnswer/MainCreateAnswer'

const AnswerList = ({
	questionId,
	userId,
}: {
	questionId: string
	userId: number
}) => {
	const { getAnswersByQuestionId } = useQuestionStore()
	const answers = getAnswersByQuestionId(parseInt(questionId)) || []

	const itemsPerPage = 5
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(answers.length / itemsPerPage)

	const paginatedReviews = answers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className='flex flex-col gap-6 mt-3'>
			{paginatedReviews.length > 0 ? (
				<div className='flex flex-col gap-3'>
					{paginatedReviews.map(content => (
						<AnswerCard key={content.id} userId={userId} content={content} />
					))}
				</div>
			) : (
				<div className='flex flex-col items-center mt-5 gap-2'>
					<p>Ответов пока нет :( </p>
					<p>Но вы можете стать первым ответившим!!!</p>

					<MainCreateAnswer
						questionId={parseInt(questionId)}
					></MainCreateAnswer>
				</div>
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

export default AnswerList
