import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/storage/UseProductStore'
import { useEffect } from 'react'
import ProductCard from './ProductCard'

const List = ({
	isLoading,
	products,
	fetchProducts,
}: {
	isLoading: boolean
	products: Product[]
	fetchProducts: () => void
}) => {
	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Товары</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					products.map(product => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))
				)}
			</CardContent>
		</Card>
	)
}

export default List
