import { cookies } from 'next/headers'

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import Header from '@/components/dashboard/Layout/Header'

export async function Layout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<div className='grid grid-cols-1 w-full sm:grid-cols-[auto_1fr]'>
				<AppSidebar />
				<SidebarInset className='w-full'>
					<div className='flex flex-row'>
						<SidebarTrigger className='ml-1 mt-2' />
						<Header></Header>
					</div>
					<main className='w-full'>
						<div className='font-bold text-2xl w-fit ml-4'></div>
						{children}
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}

export default Layout
