import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ShoppingBag, Store } from 'lucide-react'

const ReviewsHeader = ({
	toggledType,
	setToggledType,
}: {
	toggledType: string
	setToggledType: (type: string) => void
}) => {
	return (
		<div className='flex flex-col lg:flex-row lg:gap-4 lg:justify-between items-center lg:px-4'>
			<h2 className='text-2xl sm:text-xl font-bold text-card-foreground mb-4 sm:mb-0'>
				{toggledType === 'reviews' ? (
					<div className='flex items-center gap-2'>
						Отзывы о товаре <ShoppingBag />
					</div>
				) : (
					<div className='flex items-center gap-2'>
						Отзывы о магазине <Store />
					</div>
				)}
			</h2>
			<Select value={toggledType} onValueChange={setToggledType}>
				<SelectTrigger className='w-[250px]'>
					<SelectValue placeholder='Выберите тип отзыва'></SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='reviews'>Отзывы о товаре</SelectItem>
					<SelectItem value='store'>Отзывы о магазине</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default ReviewsHeader
