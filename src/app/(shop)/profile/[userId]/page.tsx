import MainProfile from '@/components/shop/profile/MainProfile'

const Profile = async ({ params }: { params: Promise<{ userId: string }> }) => {
	const { userId } = await params
	console.log(userId)
	const userFIO = { username: 'Алёшка', lastName: 'Лепёшкович' }
	return <MainProfile userFIO={userFIO} />
}

export default Profile
