import { Button } from '@/components/ui/button'
import { LiaSadTear } from 'react-icons/lia'

const FavouritesEmptyState = () => (
	<div className='flex flex-col items-center justify-center gap-4'>
		<LiaSadTear className='w-16 h-16 text-muted-foreground' />
		<p className='text-muted-foreground text-center'>
			У вас пока нет избранных товаров. Добавляйте товары в избранное, чтобы
			быстро их находить.
		</p>
		<Button variant='default' size='lg' className='mt-4'>
			Перейти в каталог
		</Button>
	</div>
)

export default FavouritesEmptyState
