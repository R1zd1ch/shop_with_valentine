// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select'
// import { ShoppingBag, Store } from 'lucide-react'

import { CircleHelp } from 'lucide-react'

const ReviewsHeader = () => {
	return (
		<div className='flex flex-col lg:flex-row lg:gap-4 lg:justify-between items-center lg:px-4'>
			<div className='text-2xl sm:text-xl font-bold text-card-foreground mb-4 sm:mb-0 flex flex-row gap-2 items-center min-h-10'>
				Ваши вопросы <CircleHelp />
			</div>
			{/* <Select value={toggledType} onValueChange={setToggledType}>
				<SelectTrigger className='w-[250px]'>
					<SelectValue placeholder='Выберите тип отзыва'></SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='reviews'>Отзывы о товаре</SelectItem>
					<SelectItem value='store'>Отзывы о магазине</SelectItem>
				</SelectContent>
			</Select> */}
		</div>
	)
}

export default ReviewsHeader
