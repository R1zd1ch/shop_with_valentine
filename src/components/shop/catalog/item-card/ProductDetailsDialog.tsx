import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	stockQuantity: number
	category: string
	color: string
	memory: string
	compatibility: string
}

const ProductDetailsDialog = ({ product }: { product: Product }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<p className='text-primary cursor-pointer transition duration-150 hover:text-primary/80'>
						Больше о описании и характеристиках
					</p>
				</div>
			</DialogTrigger>

			<DialogContent className='flex flex-col gap-10 p-8 max-w-screen max-h-screen md:max-w-[50vw] md:max-h-[75vh] md:min-h-[75vh] '>
				<DialogHeader className=''>
					<DialogTitle className=' font-bold text-foreground text-2xl flex flex-col md:flex-row gap-x-2'>
						<p>Полная информация о </p>
						<p className='underline'>« {product.name} »</p>
					</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-4 overflow-y-auto'>
					<div>
						<p className='font-bold text-lg'>Описание товара:</p>
						<p>{product.description}</p>
					</div>
					<div>
						<p className='font-bold text-lg'>Характеристики товара:</p>
						<div>
							<p>
								<strong>Категория:</strong> {product.category}
							</p>
							<p>
								<strong>Цвет:</strong> {product.color}
							</p>
							<p>
								<strong>Память:</strong> {product.memory}
							</p>
							<p>
								<strong>Совместимость:</strong> {product.compatibility}
							</p>
						</div>
					</div>
					<p
						className={`${
							product.stockQuantity > 0 ? 'text-green-600' : 'text-destructive'
						}`}
					>
						<strong>Наличие:</strong>{' '}
						{product.stockQuantity > 0
							? `${product.stockQuantity} в наличии`
							: 'Нет в наличии'}
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ProductDetailsDialog
