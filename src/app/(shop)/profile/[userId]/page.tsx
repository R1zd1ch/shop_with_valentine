import { SearchParams } from 'next/dist/server/request/search-params'
import MainProfile from '@/components/profile/MainProfile'

const Profile = async ({ params }: { params: SearchParams }) => {
	const { userId } = await params
	const userFIO = { username: 'Алёшка', lastName: 'Лепёшкович' }
	return <MainProfile userFIO={userFIO} />
}

export default Profile
