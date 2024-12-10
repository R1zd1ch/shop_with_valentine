import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../ui/card'
import { Review, useSortReviewsStore } from '@/storage/UseStoreReviews'
import ReviewCard from './ReviewCard'
import { useState, useMemo } from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import ReviewCardSkeleton from './ReviewCardSkeleton'

const ReviewsList = ({
	reviews,
	isLoading,
}: {
	reviews: Review[]
	isLoading: boolean
}) => {
	const { sortOption } = useSortReviewsStore()
	const itemsPerPage = 6
	const [currentPage, setCurrentPage] = useState(1)

	// Применение сортировки
	const sortedReviews = useMemo(() => {
		return [...reviews].sort((a, b) => {
			// Сортировка по наличию ответа
			if (sortOption.date === 'none' && sortOption.withResponse === 'asc') {
				return (b.adminResponse?.length || 0) - (a.adminResponse?.length || 0)
			}

			if (sortOption.date === 'none' && sortOption.withResponse === 'desc') {
				return (a.adminResponse?.length || 0) - (b.adminResponse?.length || 0)
			}

			// Сортировка по дате
			if (sortOption.date === 'asc' && sortOption.withResponse === 'none') {
				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			}

			if (sortOption.date === 'desc' && sortOption.withResponse === 'none') {
				return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			}

			// Сортировка по дате и наличию ответа
			if (sortOption.date === 'asc' && sortOption.withResponse === 'asc') {
				return (
					(b.adminResponse?.length || 0) -
					(a.adminResponse?.length || 0) +
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				)
			}

			if (sortOption.date === 'desc' && sortOption.withResponse === 'desc') {
				return (
					(a.adminResponse?.length || 0) -
					(b.adminResponse?.length || 0) +
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				)
			}

			if (sortOption.date === 'asc' && sortOption.withResponse === 'desc') {
				return (
					(a.adminResponse?.length || 0) -
					(b.adminResponse?.length || 0) +
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				)
			}

			if (sortOption.date === 'desc' && sortOption.withResponse === 'asc') {
				return (
					(a.adminResponse?.length || 0) -
					(b.adminResponse?.length || 0) +
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				)
			}

			return 0
		})
	}, [reviews, sortOption])

	// Пагинация
	const totalPages = Math.ceil(sortedReviews.length / itemsPerPage)
	const paginatedReviews = sortedReviews.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	// Заголовок для сортировки
	const textHeader: string = (() => {
		switch (sortOption.date) {
			case 'asc':
				return 'Сначала новые отзывы'
			case 'desc':
				return 'Сначала старые отзывы'
			default:
				return 'Все отзывы'
		}
	})()

	const textHeader2: string | null = (() => {
		switch (sortOption.withResponse) {
			case 'asc':
				return 'с ответами'
			case 'desc':
				return 'без ответов'
			default:
				return null
		}
	})()

	const finalTextHeader: string = (() => {
		if (textHeader2 !== null && textHeader !== 'Все отзывы') {
			return `${textHeader} ${textHeader2}`
		}
		if (textHeader2 !== null && textHeader === 'Все отзывы') {
			return `Сначала ${textHeader.toLowerCase()} ${textHeader2}`
		}
		return textHeader
	})()

	return (
		<Card className=''>
			<CardHeader className='border-b-2'>
				<CardTitle>{finalTextHeader}</CardTitle>
			</CardHeader>
			<CardContent className='px-4 md:px-4 pb-1 min-h-[700px]'>
				<div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{isLoading
						? Array.from({ length: 6 }).map((_, index) => (
								<ReviewCardSkeleton key={index}></ReviewCardSkeleton>
						  ))
						: paginatedReviews.map(review => (
								<ReviewCard key={review.id} review={review} />
						  ))}
				</div>
			</CardContent>
			<CardFooter className='w-full flex flex-col items-center'>
				{totalPages > 1 && (
					<div className='mt-6'>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious
										href='#'
										onClick={() =>
											handlePageChange(Math.max(currentPage - 1, 1))
										}
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
					</div>
				)}
			</CardFooter>
		</Card>
	)
}

export default ReviewsList
