'use client'

import { Card, CardContent } from '@/components/ui/card'
import SettingsHeader from './SettingsHeader'
import { Separator } from '@/components/ui/separator'

const SettingsUser = ({ userId }: { userId: number }) => {
	console.log(userId)
	return (
		<Card className='flex flex-col min-h-[75vh] w-full p-6 px-0 lg:px-6'>
			<SettingsHeader></SettingsHeader>
			<Separator className='my-4'></Separator>
			<CardContent className='flex flex-col gap-6 px-0'></CardContent>
		</Card>
	)
}

export default SettingsUser
