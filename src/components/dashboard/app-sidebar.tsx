'use client'
import {
	Calendar,
	Home,
	Inbox,
	Settings,
	User,
	FileText,
	CircleHelp,
	Star,
	LayoutList,
} from 'lucide-react'
import { AiOutlineProduct } from 'react-icons/ai'
import { RiAdminLine } from 'react-icons/ri'
import { FaListCheck } from 'react-icons/fa6'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import AdminUser from './AdminUser'
import { usePathname } from 'next/navigation'

const menuGroups = [
	{
		label: 'Главное',
		items: [
			{
				title: 'Главная',
				url: '/dashboard',
				icon: Home,
			},
			{
				title: 'Обратная связь',
				url: '/dashboard/feedback',
				icon: Inbox,
			},
			{
				title: 'Календарь',
				url: '/dashboard/calendar',
				icon: Calendar,
			},
			{
				title: 'Задачи и цели',
				url: '/dashboard/tasks',
				icon: LayoutList,
			},
		],
	},
	{
		label: 'Управление',
		items: [
			{
				title: 'Пользователи',
				url: '/admin/users',
				icon: User,
			},
			{
				title: 'Администраторы',
				url: '/admin/admins',
				icon: RiAdminLine,
			},
			{
				title: 'Товары',
				url: '/dashboard/products',
				icon: AiOutlineProduct,
			},
			{
				title: 'Отзывы',
				url: '/admin/reviews',
				icon: Star,
			},
			{
				title: 'Вопросы',
				url: '/admin/questions',
				icon: CircleHelp,
			},
			{
				title: 'Контент',
				url: '/admin/content',
				icon: FileText,
			},

			{
				title: 'Заказы',
				url: '/admin/orders',
				icon: FaListCheck,
			},
		],
	},
	{
		label: 'Настройки',
		items: [
			{
				title: 'Главные настройки',
				url: '/admin/settings',
				icon: Settings,
			},
		],
	},
]

const user = {
	name: 'shadcn',
	email: 'm@example.com',
	avatar: '/avatars/shadcn.jpg',
}

export function AppSidebar() {
	const path = usePathname()
	return (
		<Sidebar className='' collapsible='icon' variant='floating'>
			<div className='flex flex-row items-end gap-2 justify-left m-4 lg:m-8 lg:mb-0 mb-0 group-data-[collapsible=icon]:m-2'>
				<div className=''>
					<Link href='/main' className='text-3xl font-extrabold text-primary'>
						<p className='text-3xl font-extrabold text-primary group-data-[collapsible=icon]:text-2xl'>
							GS
						</p>
					</Link>
				</div>

				<p className='text-sm text-muted-foreground transition-opacity duration-100 ease-in-out opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden'>
					Dashboard
				</p>
			</div>
			<SidebarContent className='lg:p-4 group-data-[collapsible=icon]:p-0'>
				{menuGroups.map(group => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel className='text-md'>
							{group.label}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map(item => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												href={item.url}
												className={`flex items-center space-x-2 ${
													path === item.url ? 'bg-muted' : ''
												}`}
											>
												<item.icon className='' size={12} />
												<span className='text-lg'>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter className='lg:p-4 group-data-[collapsible=icon]:p-2'>
				<AdminUser user={user}></AdminUser>
			</SidebarFooter>
			<SidebarRail className=''></SidebarRail>
		</Sidebar>
	)
}
