'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '../../ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MdLocationCity } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { FaPhone } from 'react-icons/fa'
import { User } from 'lucide-react'

import useUserStore from '@/storage/UseUserStore'

export function InformationUser() {
	const { user } = useUserStore()

	if (!user) {
		return null
	}

	return (
		<Card className='p-2 w-full h-fit'>
			<CardHeader>
				<CardTitle className=' font-semibold'>
					<div className='flex gap-2 items-center'>
						<User className='w-8 h-8'></User>
						<p>Аккаунт</p>
					</div>
				</CardTitle>
			</CardHeader>
			<Separator></Separator>
			<CardContent className='mt-4'>
				{/* Профильное фото */}
				<div className='flex items-center xl:flex-row md:flex-col  gap-4 mb-8'>
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
						<div className='flex flex-row items-center gap-2'>
							<FaPhone></FaPhone>
							<p className=''>Номер телефона: </p>
						</div>
						<p className='ml-6 text-muted-foreground text-sm'>{user.phone}</p>
					</div>
					<div>
						<div className='flex flex-row items-center gap-2'>
							<MdEmail></MdEmail>
							<p className=''>Почта: </p>
						</div>
						<p className='ml-6 text-muted-foreground text-sm'>{user.email}</p>
					</div>
					<div>
						<div className='flex flex-row items-center gap-2'>
							<IoHome></IoHome>
							<p className=''>Адрес: </p>
						</div>
						<p className='ml-6 text-muted-foreground text-sm'>{user.address}</p>
					</div>
					<div>
						<div className='flex flex-row items-center gap-2'>
							<MdLocationCity></MdLocationCity>
							<p className=''>Город: </p>
						</div>
						<p className='ml-6 text-muted-foreground text-sm'>{user.city}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default InformationUser
