'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
	{ id: 'purchase-history', label: 'История покупок' },
	{ id: 'payment-info', label: 'Платёжные данные' },
	{ id: 'favorites', label: 'Избранное' },

	{ id: 'reviews', label: 'Рейтинг и отзывы' },
	{ id: 'settings', label: 'Настройки' },
]

export function Header({ userId }: { userId: string }) {
	const [activeTab, setActiveTab] = useState('')
	const path = usePathname()
	const pathArray = path.split('/')
	const currentPath = pathArray[pathArray.length - 1]
	useEffect(() => {
		setActiveTab(currentPath)
	}, [currentPath])

	return (
		<Card className='flex flex-row items-center justify-center'>
			<CardContent className='flex space-x-6 overflow-x-auto py-4'>
				{tabs.map(tab => (
					<Link key={tab.id} href={`/profile/${userId}/${tab.id}`}>
						<Button
							className={cn(
								'text-sm font-medium px-4 py-2 rounded-md bg-inherit text-secondary-foreground transition-colors border',
								activeTab === tab.id
									? 'bg-primary text-primary-foreground'
									: 'hover:bg-secondary'
							)}
						>
							{tab.label}
						</Button>
					</Link>
				))}
			</CardContent>
		</Card>
	)
}
export default Header
