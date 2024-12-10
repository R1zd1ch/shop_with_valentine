import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import PurchaseHeader from './PurchaseHeader'
import PurchasesEmptyState from './EmptyState'

const PurchaseHistory = ({}) => {
	const purchase: never[] = []

	const hasPurchases = purchase && purchase.length > 0
	return (
		<Card className='flex flex-col min-h-[75vh] w-full p-6 px-0 lg:px-6'>
			<PurchaseHeader></PurchaseHeader>
			<Separator className='my-4'></Separator>
			<CardContent className='flex flex-col gap-6 px-0'>
				{hasPurchases ? <></> : <PurchasesEmptyState></PurchasesEmptyState>}
			</CardContent>
		</Card>
	)
}

export default PurchaseHistory
