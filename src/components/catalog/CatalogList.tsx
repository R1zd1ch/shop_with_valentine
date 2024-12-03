import { FC, useState, useMemo, useEffect } from 'react'
import { Button } from '../ui/button'
import CatalogCard from './CatalogCard'
import useFilterStore from '@/storage/UseFilterStore'
import useProductStore from '@/storage/UseProductStore'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import SkeletonCard from './SkeletonCard'

const catalogHeader: { [key: string]: string } = {
	iphone: 'iPhone',
	ipad: 'iPad',
	macbook: 'MacBook',
	watch: 'Apple Watch',
	airpods: 'AirPods',
	accessories: 'Аксессуары',
	all: 'Все',
}

const CatalogList: FC = () => {
	const {
		category,
		priceRange,
		color,
		memory,
		availability,
		compatibility,
		searchTerm,
		setSearchTerm,
		isDiscount,
	} = useFilterStore()
	const { products, isLoading, fetchProducts } = useProductStore()

	const [currentPage, setCurrentPage] = useState(1)
	const [isFiltering, setIsFiltering] = useState(false)
	const ITEMS_PER_PAGE = 12

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	useEffect(() => {
		setIsFiltering(true)
		const timer = setTimeout(() => {
			setIsFiltering(false)
		}, 500)
		return () => clearTimeout(timer)
	}, [
		category,
		priceRange,
		color,
		memory,
		availability,
		compatibility,
		searchTerm,
		isDiscount,
	])

	const filteredProducts = useMemo(() => {
		if (isLoading || products.length === 0) return []

		return products.filter(product => {
			if (category !== 'all' && product.category !== category) return false
			if (color !== 'all' && product.color !== color) return false
			if (memory !== 'all' && product.memory !== memory) return false
			if (compatibility !== 'all' && product.compatibility !== compatibility)
				return false
			if (product.price < priceRange[0] || product.price > priceRange[1])
				return false
			if (searchTerm) {
				const lowerSearch = searchTerm.toLowerCase()
				return (
					product.name.toLowerCase().includes(lowerSearch) ||
					product.description.toLowerCase().includes(lowerSearch)
				)
			}
			if (isDiscount !== null) {
				if (isDiscount == true && !product.discountPrice) return false
				if (isDiscount == false && product.discountPrice) return false
			}
			return true
		})
	}, [
		products,
		category,
		priceRange,
		color,
		memory,
		availability,
		compatibility,
		searchTerm,
		isLoading,
		isDiscount,
	])

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		return filteredProducts.slice(startIndex, endIndex)
	}, [filteredProducts, currentPage])

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1)
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}

	return (
		<Card className='min-h-screen flex flex-col bg-card shadow-md'>
			<CardHeader className='flex flex-col md:flex-row justify-between items-center p-4 border-b'>
				<CardTitle className='text-xl font-bold'>{`Каталог: ${
					catalogHeader[category] || 'Каталог'
				}`}</CardTitle>
				<div className='flex items-center space-x-2 w-full md:w-1/3'>
					<Label htmlFor='search' className='block text-sm font-medium'>
						Поиск
					</Label>
					<Search />
					<Input
						id='search'
						type='text'
						placeholder='Введите название или описание'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='text-center'
					/>
				</div>
			</CardHeader>
			<CardContent className='flex-1 p-0'>
				<div className='p-4 px-0 md:px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
					{isLoading || isFiltering ? (
						Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
							<SkeletonCard key={index} />
						))
					) : paginatedProducts.length > 0 ? (
						paginatedProducts.map(product => (
							<CatalogCard key={product.id} product={product} />
						))
					) : (
						<p className='col-span-full text-center text-muted-foreground'>
							Нет товаров по выбранным фильтрам
						</p>
					)}
				</div>
			</CardContent>
			<div className='flex justify-between items-center p-4 border-t'>
				<Button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					variant='outline'
				>
					<ChevronLeft />
				</Button>
				<span className='text-sm'>{`Страница ${currentPage} из ${totalPages}`}</span>
				<Button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					variant='outline'
				>
					<ChevronRight />
				</Button>
			</div>
		</Card>
	)
}

export default CatalogList
