'use client'

import {
	FaFacebook,
	FaInstagram,
	FaTwitter,
	FaVk,
	FaGoogle,
} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'

const SocialMediaContacts = () => {
	return (
		<Card className='flex flex-col shadow-md w-full rounded-lg'>
			<CardHeader className='bg-secondary text-center rounded-t-lg'>
				<CardTitle className=' '>Наши социальные сети</CardTitle>
			</CardHeader>
			<CardContent className='p-6 flex flex-col gap-y-6'>
				{/* Facebook */}
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-md font-medium '>Facebook:</p>
						<p className='text-sm text-muted-foreground pr-2'>
							Присоединяйтесь к нам, чтобы следить за новостями и обновлениями.
						</p>
					</div>
					<Button
						rel='noopener noreferrer'
						variant='outline'
						className='flex items-center gap-x-2 px-4 py-2'
					>
						<FaFacebook className='text-facebook text-xl' />
						<span className='hidden sm:block'>Перейти</span>
					</Button>
				</div>

				{/* Instagram */}
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-md font-medium '>Instagram:</p>
						<p className='text-sm text-muted-foreground pr-2'>
							Следите за нашими фотографиями и историями из жизни компании.
						</p>
					</div>
					<Button
						rel='noopener noreferrer'
						variant='outline'
						className='flex items-center gap-x-2 px-4 py-2'
					>
						<FaInstagram className='text-instagram text-xl' />
						<span className='hidden sm:block'>Перейти</span>
					</Button>
				</div>

				{/* Twitter */}
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-md font-medium '>Twitter:</p>
						<p className='text-sm text-muted-foreground pr-2'>
							Узнавайте о новостях и обновлениях в режиме реального времени.
						</p>
					</div>
					<Button
						rel='noopener noreferrer'
						variant='outline'
						className='flex items-center gap-x-2 px-4 py-2'
					>
						<FaTwitter className='text-twitter text-xl' />
						<span className='hidden sm:block'>Перейти</span>
					</Button>
				</div>

				{/* VK */}
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-md font-medium '>VK:</p>
						<p className='text-sm text-muted-foreground pr-2'>
							Подписывайтесь на нас в VK, чтобы быть на связи.
						</p>
					</div>
					<Button
						rel='noopener noreferrer'
						variant='outline'
						className='flex items-center gap-x-2 px-4 py-2'
					>
						<FaVk className='text-vk text-xl' />
						<span className='hidden sm:block'>Перейти</span>
					</Button>
				</div>

				{/* Google */}
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-md font-medium '>Google:</p>
						<p className='text-sm text-muted-foreground pr-2'>
							Оставляйте отзывы и оценивайте нас на платформе Google.
						</p>
					</div>
					<Button
						rel='noopener noreferrer'
						variant='outline'
						className='flex items-center gap-x-2 px-4 py-2'
					>
						<FaGoogle className='text-google text-xl ' />
						<span className='hidden sm:block'>Перейти</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default SocialMediaContacts
