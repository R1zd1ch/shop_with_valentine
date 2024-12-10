import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Instagram, Twitter, Facebook } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../ui/button'

const Footer = () => {
	return (
		<footer className='bg-card text-card-foreground py-8  shadow border-t shadow-black/20 lg:mx-[100px] md:px-4 md:rounded-t-[0.75rem] lg:px-12 mt-10'>
			<div className='container mx-auto flex flex-col items-center justify-between gap-8 sm:flex-row'>
				{/* Логотип и копирайт */}
				<div className='text-center sm:text-left'>
					<p className='text-2xl font-extrabold text-primary'>GS</p>
					<p className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} GStore. Все права защищены.
					</p>
				</div>

				{/* Меню навигации */}
				<NavigationMenu>
					<NavigationMenuList className='flex gap-6 md:flex-row flex-wrap'>
						<NavigationMenuItem>
							<Link href={'/home'} legacyBehavior passHref>
								<NavigationMenuLink
									href='/home'
									className={`${navigationMenuTriggerStyle()} text-lg text-foreground hover:text-primary`}
								>
									Главная
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href={'/catalog'} legacyBehavior passHref>
								<NavigationMenuLink
									href='/catalog'
									className={`${navigationMenuTriggerStyle()} text-lg text-foreground hover:text-primary`}
								>
									Каталог
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href={'/about'} legacyBehavior passHref>
								<NavigationMenuLink
									href='/about'
									className={`${navigationMenuTriggerStyle()} text-lg text-foreground hover:text-primary`}
								>
									О нас
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href={'/contacts'} legacyBehavior passHref>
								<NavigationMenuLink
									href='/contacts'
									className={`${navigationMenuTriggerStyle()} text-lg text-foreground hover:text-primary`}
								>
									Контакты
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				{/* Социальные сети */}
				<div className='flex items-center gap-4'>
					<Link
						href='https://instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-primary transition'
					>
						<Button variant='ghost' className='hover:text-primary'>
							<Instagram className='w-5 h-5' />
						</Button>
					</Link>
					<Link
						href='https://twitter.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-primary transition'
					>
						<Button variant='ghost' className='hover:text-primary'>
							<Twitter className='w-5 h-5' />
						</Button>
					</Link>
					<Link
						href='https://facebook.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-muted-foreground hover:text-primary transition'
					>
						<Button variant='ghost' className='hover:text-primary'>
							<Facebook className='w-5 h-5 ' />
						</Button>
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
