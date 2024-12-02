import Footer from '@/components/mainLayout/Footer'
import NavigationMenu from '@/components/mainLayout/NavigationMenu'
import { Toaster } from '@/components/ui/toaster'

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div className='bg-gradient-to-br from-muted/20 to-card '>
			<NavigationMenu></NavigationMenu>

			<div className='flex flex-col min-h-[80vh]'>{children}</div>

			<Footer></Footer>
			<Toaster></Toaster>
		</div>
	)
}

export default layout
