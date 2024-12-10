import React, { useEffect, useState } from 'react'
import { Card } from '../../ui/card'

import Link from 'next/link'
import CatalogCard from '../catalog/CatalogCard'
import useProductStore, { Product } from '@/storage/UseProductStore'
import SkeletonCard from '../catalog/SkeletonCard'

const MainPopularItems = () => {
	const [popularProducts, setPopularProducts] = useState<Product[]>([])
	const { getPopularProducts, isLoading, fetchProducts } = useProductStore()

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	useEffect(() => {
		setPopularProducts(getPopularProducts(4))
	}, [getPopularProducts])

	return (
		<Card className='px-2 sm:px-6 py-8 rounded-lg shadow-lg bg-muted/10'>
			<h2 className='text-3xl font-bold mb-8 text-foreground'>
				Популярные товары
			</h2>
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 h-full gap-2 sm:gap-6'>
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<SkeletonCard key={index} />
					  ))
					: popularProducts.map(product => (
							<CatalogCard key={product.id} product={product}></CatalogCard>
					  ))}
			</div>
			<div className='flex justify-center mt-10'>
				<p className='text-center text-base text-muted-foreground hover:text-primary transition duration-300 cursor-pointer font-bold'>
					<Link href={'/catalog'}>Показать все товары...</Link>
				</p>
			</div>
		</Card>
	)
}

export default MainPopularItems
