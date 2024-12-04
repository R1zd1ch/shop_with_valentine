import FavouriteItem from './FavouriteItem'
import { Product } from '@/storage/UseProductStore'

const FavouritesList = ({
	favourites,
	handleRemoveFromFavourite,
}: {
	favourites: Product[]
	handleRemoveFromFavourite: (id: number) => void
}) => (
	<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
		{favourites.map(item => (
			<FavouriteItem
				key={item.id}
				item={item}
				handleRemoveFromFavourite={handleRemoveFromFavourite}
			/>
		))}
	</div>
)

export default FavouritesList
