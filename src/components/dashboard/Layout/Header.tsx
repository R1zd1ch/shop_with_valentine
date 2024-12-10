import { ModeToggle } from '@/components/theme-toggle'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import AdminUser from '../AdminUser'

const user = {
	name: 'shadcn',
	email: 'm@example.com',
	avatar: '/avatars/shadcn.jpg',
}

const Header = ({}) => {
	return (
		<Card className='w-full flex items-center justify-start lg:justify-center m-2 pr-2 md:pr-0 lg:mb-10'>
			<CardHeader className='p-4'>
				<CardTitle className='text-primary'>Панель управления</CardTitle>
			</CardHeader>
			<div className='md:absolute right-4 flex flex-row items-center'>
				<ModeToggle></ModeToggle>
				<AdminUser user={user} hideUserInfo={true} isMobile={true}></AdminUser>
			</div>
		</Card>
	)
}

export default Header
