import Footer from '@/components/shop/mainLayout/Footer'
import NavigationMenu from '@/components/shop/mainLayout/NavigationMenu'
import { Toaster } from '@/components/ui/toaster'

import FloatButton from '@/components/float-button'

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div className='bg-gradient-to-br from-muted/20 to-card relative'>
			<NavigationMenu />

			<div className='flex flex-col min-h-[80vh]'>{children}</div>

			<Footer />
			<Toaster />

			{/* Плавающая кнопка */}
			<FloatButton></FloatButton>
		</div>
	)
}

export default Layout
