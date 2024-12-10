import FavouriteItem from './FavouriteItem'
import { Product } from '@/storage/UseProductStore'

const FavouritesList = ({
	favourites,
	handleRemoveFromFavourite,
	userId,
}: {
	favourites: Product[]
	handleRemoveFromFavourite: (id: number) => void
	userId: number
}) => (
	<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
		{favourites.map(item => (
			<FavouriteItem
				userId={userId}
				key={item.id}
				item={item}
				handleRemoveFromFavourite={handleRemoveFromFavourite}
			/>
		))}
	</div>
)

export default FavouritesList
