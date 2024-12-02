import Header from '@/components/profile/Header'
import InformationUser from '@/components/profile/InformationUser'
import { SearchParams } from 'next/dist/server/request/search-params'

const layout = async ({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: SearchParams
}>) => {
	const { userId } = await params
	const id = userId as string
	return (
		<div className='max-w-screen-2xl w-full mx-auto'>
			<div className='md:mx-[100px] flex flex-col gap-6'>
				<Header userId={id}></Header>
				<div className='grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1  gap-y-6'>
					<InformationUser></InformationUser>
					<div className='colspan-1 md:col-span-2 lg:col-span-3 md:ml-4'>
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default layout
