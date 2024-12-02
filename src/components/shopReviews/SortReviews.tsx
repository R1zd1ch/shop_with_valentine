import { FC, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '../ui/select'
import { useSortReviewsStore } from '@/storage/UseStoreReviews'
import { Button } from '../ui/button'

const SortReviews: FC = () => {
	const [isSortingVisible, setSortingVisible] = useState(false)
	const { sortOption, setSortOption } = useSortReviewsStore()

	const toggleSortingVisibility = () => {
		setSortingVisible(!isSortingVisible)
	}

	return (
		<Card className='p-4 shadow-md shadow-black/20'>
			<CardHeader className='p-0 pb-3 '>
				<CardTitle className='text-xl'>Сортировка</CardTitle>
			</CardHeader>
			<CardContent className='p-0'>
				{/* Кнопка для показа/скрытия сортировки на мобильных устройствах */}
				<div className='block md:hidden'>
					<Button
						className='w-full border-2'
						onClick={toggleSortingVisibility}
						variant={'ghost'}
					>
						{isSortingVisible ? 'Скрыть сортировку' : 'Показать сортировку'}
					</Button>
				</div>

				{/* Контейнер для сортировки, скрываемый на мобильных устройствах */}
				<div
					className={`space-y-4 mt-4 ${
						isSortingVisible ? 'block' : 'hidden'
					} md:block`}
				>
					{/* Сортировка по дате */}
					<div>
						<h3 className='mb-2 text-sm font-medium'>По дате</h3>
						<Select
							value={sortOption.date}
							onValueChange={value =>
								setSortOption({
									...sortOption,
									date: value as 'asc' | 'desc' | 'none',
								})
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите сортировку по дате' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='asc'>Новые сначала</SelectItem>
								<SelectItem value='desc'>Старые сначала</SelectItem>
								<SelectItem value='none'>Без сортировки</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Сортировка по наличию ответа */}
					<div>
						<h3 className='mb-2 text-sm font-medium'>По наличию ответа</h3>
						<Select
							value={sortOption.withResponse}
							onValueChange={value =>
								setSortOption({
									...sortOption,
									withResponse: value as 'asc' | 'desc' | 'none',
								})
							}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите сортировку по ответу' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='asc'>С ответом сначала</SelectItem>
								<SelectItem value='desc'>Без ответа сначала</SelectItem>
								<SelectItem value='none'>Без сортировки</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default SortReviews
