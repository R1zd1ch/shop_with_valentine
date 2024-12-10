'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import PaymentHeader from './PaymentHeader'

const PaymentInfoUser = () => {
	return (
		<Card className='flex flex-col min-h-[75vh] w-full p-6 px-0 lg:px-6'>
			<PaymentHeader></PaymentHeader>
			<Separator className='my-4'></Separator>
			<CardContent className='flex flex-col gap-6 px-0'></CardContent>
		</Card>
	)
}

export default PaymentInfoUser
