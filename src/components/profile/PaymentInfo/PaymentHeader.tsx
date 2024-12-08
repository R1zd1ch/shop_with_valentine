import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MdOutlinePayments } from 'react-icons/md'

const PaymentHeader = ({}) => {
	return (
		<CardHeader className='min-h-[100px]'>
			<CardTitle className='flex items-center gap-2 text-primary '>
				Платежные данные
				<MdOutlinePayments className='w-6 h-6'></MdOutlinePayments>
			</CardTitle>
			<CardDescription className='text-muted-foreground'>
				Здесь вы можете управлять своими платежными данными
			</CardDescription>
		</CardHeader>
	)
}

export default PaymentHeader
