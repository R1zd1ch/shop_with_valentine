'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useUserStore from '@/storage/UseUserStore'

export function InformationUser() {
	const { user } = useUserStore()

	if (!user) {
		return null
	}

	return (
		<Card className='p-2 w-full'>
			<CardHeader>
				<CardTitle className=' font-semibold'>Аккаунт</CardTitle>
			</CardHeader>
			<CardContent>
				{/* Профильное фото */}
				<div className='flex items-center lg:flex-row md:flex-col  gap-4 mb-8'>
					<Avatar className='w-28 h-28'>
						<AvatarImage src={user.image} alt='Profile Picture' />
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
					<div>
						<p className='text-xl'>{user.username}</p>
					</div>
				</div>

				{/* Контактные данные */}
				<div className='space-y-4'>
					<div>
						<p className=''>Номер телефона: </p>
						<p className='text-muted-foreground text-sm'>{user.phone}</p>
					</div>
					<div>
						<p className=''>Почта: </p>
						<p className='text-muted-foreground text-sm'>{user.email}</p>
					</div>
					<div>
						<p className=''>Адрес: </p>
						<p className='text-muted-foreground text-sm'>{user.address}</p>
					</div>
					<div>
						<p className=''>Город: </p>
						<p className='text-muted-foreground text-sm'>{user.city}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default InformationUser
