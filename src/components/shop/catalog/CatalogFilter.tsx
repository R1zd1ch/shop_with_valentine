import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Slider } from '../../ui/slider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select'
import useFilterStore from '@/storage/UseFilterStore'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'

const CatalogFilter = () => {
	const [isOpen, setIsOpen] = useState(false)

	const {
		category,
		priceRange,
		color,
		memory,
		availability,
		compatibility,
		isDiscount,
		setCategory,
		setPriceRange,
		setColor,
		setMemory,
		setAvailability,
		setCompatibility,
		setIsDiscount,
		resetAll,
	} = useFilterStore()

	return (
		<Card className='border bg-card text-card-foreground rounded-lg shadow-md shadow-black/20 p-4 '>
			{/* Toggle Filters Button for Mobile */}
			<div className='lg:hidden mb-4'>
				<Button
					variant='outline'
					className='w-full'
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
				</Button>
			</div>

			{/* Filters */}
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} lg:block transition-all duration-300`}
			>
				<CardHeader className='border-b p-4 mb-4'>
					<CardTitle className='font-semibold mb-0 '>Фильтры</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6 p-2'>
					{/* Category Filter */}
					<FilterGroup label='Категория'>
						<Select
							value={category !== 'all' ? category : ''}
							onValueChange={setCategory}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите категорию' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'all', label: 'Все' },
									{ value: 'iphone', label: 'iPhone' },
									{ value: 'ipad', label: 'iPad' },
									{ value: 'macbook', label: 'MacBook' },
									{ value: 'watch', label: 'Apple Watch' },
									{ value: 'airpods', label: 'AirPods' },
									{ value: 'accessories', label: 'Аксессуары' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					{/* Price Range Filter */}
					<FilterGroup label='Ценовой диапазон'>
						<Slider
							value={priceRange}
							onValueChange={value => setPriceRange(value as [number, number])}
							min={0}
							max={500000}
							step={1000}
							className='w-full'
						/>
						<div className='flex justify-between text-sm mt-2 text-muted-foreground'>
							<span>{priceRange[0]} ₽</span>
							<span>{priceRange[1]} ₽</span>
						</div>
					</FilterGroup>
					{/* Color Filter */}
					<FilterGroup label='Цвет'>
						<Select
							value={color !== 'all' ? color : ''}
							onValueChange={setColor}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите цвет' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'all', label: 'Все' },
									{ value: 'black', label: 'Черный' },
									{ value: 'white', label: 'Белый' },
									{ value: 'silver', label: 'Серебристый' },
									{ value: 'gold', label: 'Золотой' },
									{ value: 'blue', label: 'Синий' },
									{ value: 'green', label: 'Зеленый' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					{/* Memory Filter */}
					<FilterGroup label='Память'>
						<Select
							value={memory !== 'all' ? memory : ''}
							onValueChange={setMemory}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите объем памяти' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'all', label: 'Все' },
									{ value: '64gb', label: '64 ГБ' },
									{ value: '128gb', label: '128 ГБ' },
									{ value: '256gb', label: '256 ГБ' },
									{ value: '512gb', label: '512 ГБ' },
									{ value: '1tb', label: '1 ТБ' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					{/* Availability Filter */}
					<FilterGroup label='Наличие'>
						<Select
							value={availability !== 'all' ? availability : ''}
							onValueChange={setAvailability}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите статус' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'all', label: 'Все' },
									{ value: 'inStock', label: 'В наличии' },
									{ value: 'preOrder', label: 'Предзаказ' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					{/* Compatibility Filter */}
					<FilterGroup label='Совместимость'>
						<Select
							value={compatibility !== 'all' ? compatibility : ''}
							onValueChange={setCompatibility}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Выберите совместимость' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'all', label: 'Все' },
									{ value: 'ios', label: 'iOS' },
									{ value: 'macos', label: 'macOS' },
									{ value: 'watchos', label: 'watchOS' },
									{ value: 'airpods', label: 'AirPods' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					{/* Скидка? */}
					<FilterGroup label='Горячие предложения'>
						<Select
							value={isDiscount !== null ? String(isDiscount) : ''}
							onValueChange={value => {
								const parsedValue =
									value === 'true' ? true : value === 'false' ? false : null
								setIsDiscount(parsedValue)
							}}
						>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Со скидкой?' />
							</SelectTrigger>
							<SelectContent>
								{[
									{ value: 'true', label: 'Да' },
									{ value: 'false', label: 'Нет' },
									{ value: 'all', label: 'Все' },
								].map(item => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FilterGroup>
					<Button onClick={() => resetAll()} className='w-full'>
						Сбросить фильтры
					</Button>
				</CardContent>
			</div>
		</Card>
	)
}

const FilterGroup: React.FC<{ label: string; children: React.ReactNode }> = ({
	label,
	children,
}) => (
	<div>
		<Label className='block text-sm font-medium mb-2'>{label}</Label>
		{children}
	</div>
)

export default CatalogFilter
