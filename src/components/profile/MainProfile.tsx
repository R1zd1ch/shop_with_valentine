import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const MainProfile = ({
	userFIO,
}: {
	userFIO: { username: string; lastName: string }
}) => {
	const name = userFIO.username
	const lastName = userFIO?.lastName ? userFIO.lastName : ''
	return (
		<Card className='flex w-full min-h-full flex-col '>
			<CardHeader>
				<CardTitle>
					Здравствуйте, {name} {lastName}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p>
					Выберите, что хотите изменить или просмотреть в профиле, используя
					меню выше
				</p>
			</CardContent>
		</Card>
	)
}

export default MainProfile
