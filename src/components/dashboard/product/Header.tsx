import { CardHeader, CardTitle } from '@/components/ui/card'
import { AddProduct } from './Buttons'

const Header = ({}) => {
	return (
		<CardHeader className='p-4 flex items-center justify-between flex-row lg:px-8'>
			<div className='flex flex-col lg:flex-row lg:items-end gap-2'>
				<CardTitle className='p-0'>Управление товарами</CardTitle>
				<p className='text-sm text-muted-foreground'>всего товаров: 0</p>
			</div>
			<div>
				<AddProduct></AddProduct>
			</div>
		</CardHeader>
	)
}

export default Header
