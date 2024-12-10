'use client'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { ModeToggle } from '@/components/theme-toggle'

import {
	Home,
	LibraryBig,
	Mail,
	Menu,
	MessageSquare,
	ShoppingCart,
	User,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../ui/button'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../../ui/sheet'
import { Badge } from '../../ui/badge'
import useCartStore from '@/storage/UseCartStore'

const NavigationMenuComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [totalItems, setTotalItems] = useState(0)
	const pathName = usePathname()
	const userId = 1
	const { CartItems } = useCartStore()
	// useEffect(() => {
	// 	loadMockData()
	// }, [])
	useEffect(() => {
		const ReducedItems = CartItems.reduce((total, item) => {
			return total + item.quantity
		}, 0)
		setTotalItems(ReducedItems)
	}, [CartItems])

	useEffect(() => {
		console.log('CartItems:', CartItems)
	}, [CartItems])
	return (
		<header className='inset-x-0 top-0 z-50 shadow-lg shadow-black/20 lg:mx-[100px] py-6 px-4 lg:px-12 sm:rounded-b-[0.75rem] border-b mb-4'>
			<div className='container mx-auto flex items-center justify-between'>
				{/* Логотип */}
				<div>
					<Link href='/main' className='text-3xl font-extrabold text-primary'>
						<p className='text-3xl font-extrabold text-primary'>GS</p>
					</Link>
				</div>

				{/* Навигационные ссылки для десктопа */}
				<nav className=' hidden md:flex items-center gap-6 '>
					<NavigationMenu>
						<NavigationMenuList>
							{[
								{ name: 'Главная', href: '/main' },
								{ name: 'Каталог', href: '/catalog' },
								{ name: 'О нас', href: '/about' },
								{ name: 'Контакты', href: '/contacts' },
								{ name: 'Отзывы', href: '/reviews' },
							].map(item => (
								<NavigationMenuItem key={item.href}>
									<Link href={`${item.href}`} legacyBehavior passHref>
										<NavigationMenuLink
											className={`${navigationMenuTriggerStyle()} hover:text-primary ${
												pathName === item.href ? ' bg-input' : ''
											}`}
										>
											<p className='from-accent-foreground  text-balance text-lg '>
												{item.name}
											</p>
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</nav>

				{/* Иконки корзины, профиля и мобильное меню */}
				<div className='flex items-center gap-4'>
					{/* Переключатель темы */}
					<ModeToggle />

					{/* Корзина */}

					<Link
						href={`/cart/${userId}`}
						aria-label='Shopping Cart'
						className='relative'
					>
						<Button
							variant='ghost'
							className={`hover:text-primary ${
								pathName === `/cart/${userId}` ? ' bg-input' : ''
							}`}
						>
							<ShoppingCart className='w-6 h-6 text-foreground' />
							{totalItems > 0 && (
								<Badge className='absolute -top-2 -right-2'>{totalItems}</Badge>
							)}
							{/* {CartItems.length > 0 && (
								<Badge className='absolute -top-2 -right-2'>
									{CartItems.length}
								</Badge>
							)} */}
						</Button>
					</Link>

					{/* Профиль */}
					<Link href={`/profile/${userId}`} aria-label='User Profile'>
						<Button
							variant='ghost'
							className={`hover:text-primary ${
								pathName === `/profile/${userId}` ? ' bg-input' : ''
							}`}
						>
							<User className='w-6 h-6 text-foreground ' />
						</Button>
					</Link>

					{/* Мобильное меню */}
					<div className='md:hidden'>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<div className='cursor-pointer'>
									<Menu className='w-6 h-6 text-foreground hover:text-primary' />
								</div>
							</SheetTrigger>

							<SheetContent
								side='right'
								className='p-4 bg-card text-card-foreground'
							>
								<SheetHeader className='mt-6'>
									<SheetTitle className='text-xl'>Меню</SheetTitle>
									<SheetDescription>
										Выберите страницу, на которую хотите перейти
									</SheetDescription>
								</SheetHeader>
								<nav className='mt-5 flex flex-col gap-2'>
									{[
										{ name: 'Главная', href: '/main', icon: <Home /> },
										{ name: 'Каталог', href: '/catalog', icon: <LibraryBig /> },
										{ name: 'О нас', href: '/about', icon: <User /> },
										{ name: 'Контакты', href: '/contacts', icon: <Mail /> },
										{
											name: 'Отзывы',
											href: '/reviews',
											icon: <MessageSquare />,
										},
									].map(item => (
										<Link
											key={item.href}
											href={item.href}
											className={`block w-full py-2 px-4 text-md hover:bg-muted rounded-md ${
												pathName === item.href ? 'bg-input' : ''
											}`}
											onClick={() => setIsOpen(false)}
										>
											<div className='flex gap-4'>
												{item.icon}
												{item.name}
											</div>
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	)
}

export default NavigationMenuComponent
