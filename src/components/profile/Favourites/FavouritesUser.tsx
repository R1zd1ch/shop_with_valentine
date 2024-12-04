'use client'
import { Card, CardContent } from '@/components/ui/card'
import FavouritesHeader from './FavouritesHeader'
import { Separator } from '@/components/ui/separator'
import FavouritesList from './FavouritesList'
import FavouritesEmptyState from './FavouritesEmptyState'
import useFavouritesStore from '@/storage/UseFavourites'
import useProductStore, { Product } from '@/storage/UseProductStore'
import { useEffect, useState } from 'react'

const FavouritesUser = ({ userId }: { userId: number }) => {
	const [favouritesItems, setFavouritesItems] = useState<Product[]>([])
	const { favourites, removeFavouriteByUserAndProduct } = useFavouritesStore()
	const { getProductById } = useProductStore()

	const handleRemoveFromFavourite = (id: number) => {
		removeFavouriteByUserAndProduct(userId, id)
	}

	useEffect(() => {
		setFavouritesItems([])
		favourites.forEach(favourite => {
			getProductById(favourite.productId)
			setFavouritesItems(prev => [...prev, getProductById(favourite.productId)])
		})
	}, [favourites])
	useEffect(() => {
		console.log(favouritesItems)
	}, [favouritesItems])

	const hasFavourites = favourites && favourites.length > 0

	return (
		<Card className='flex flex-col min-h-[75vh] w-full p-6 px-0 lg:px-6'>
			<FavouritesHeader />
			<Separator className='my-4' />
			<CardContent className='flex flex-col gap-6 px-0'>
				{hasFavourites ? (
					<FavouritesList
						handleRemoveFromFavourite={handleRemoveFromFavourite}
						favourites={favouritesItems}
					/>
				) : (
					<FavouritesEmptyState />
				)}
			</CardContent>
		</Card>
	)
}

export default FavouritesUser
