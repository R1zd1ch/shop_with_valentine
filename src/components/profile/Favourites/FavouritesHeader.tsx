import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LiaHeart } from 'react-icons/lia'

const FavouritesHeader = () => (
	<CardHeader className='min-h-[100px]'>
		<CardTitle className='flex items-center gap-2 text-primary'>
			Избранное
			<LiaHeart className='w-6 h-6 text-red-500' />
		</CardTitle>
		<CardDescription className='text-muted-foreground'>
			Здесь вы можете управлять товарами, добавленными в избранное.
		</CardDescription>
	</CardHeader>
)

export default FavouritesHeader
