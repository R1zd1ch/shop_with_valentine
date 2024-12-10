import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'

const PurchaseHeader = ({}) => {
	return (
		<CardHeader className='min-h-[100px]'>
			<CardTitle className='flex items-center gap-2 text-primary '>
				История покупок
				<ShoppingBag className='w-6 h-6' />
			</CardTitle>
			<CardDescription className='text-muted-foreground'>
				Здесь вы можете управлять своими покупками
			</CardDescription>
		</CardHeader>
	)
}

export default PurchaseHeader
