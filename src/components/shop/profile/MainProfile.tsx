import getFriendlyMessage from '@/lib/getGreetingDay'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '../../ui/card'
import { Separator } from '@/components/ui/separator'
import {
	LiaHandPeace,
	LiaHandPointUp,
	LiaStar,
	LiaShoppingCartSolid,
	LiaQuestionCircle,
	LiaComments,
	LiaMoneyCheckAltSolid,
} from 'react-icons/lia'

const MainProfile = ({
	userFIO,
}: {
	userFIO: { username: string; lastName: string }
}) => {
	const name = userFIO.username
	const lastName = userFIO?.lastName ? userFIO.lastName : ''
	const day = getFriendlyMessage()

	return (
		<Card className='w-full min-h-[70vh] flex flex-col p-6'>
			<CardHeader className='space-y-3'>
				<CardTitle className='flex items-center gap-3 text-primary'>
					Здравствуйте, {name} {lastName}!
					<LiaHandPeace className='w-6 h-6' />
				</CardTitle>
				<CardDescription className='text-muted-foreground'>
					{day}
				</CardDescription>
			</CardHeader>

			<Separator className='my-4' />

			<CardContent className='space-y-8'>
				<section>
					<CardTitle className='flex items-center gap-2 text-base'>
						<LiaHandPointUp className='text-secondary-foreground w-5 h-5' />
						Вы находитесь в профиле. Чтобы изменить настройки или просмотреть
						информацию, используйте меню выше.
					</CardTitle>
				</section>

				<section>
					<CardTitle className='text-lg font-semibold'>Статистика</CardTitle>
					<div className='space-y-3'>
						<p className='flex items-center gap-3 text-sm'>
							<LiaShoppingCartSolid className='text-muted-foreground w-5 h-5' />
							Всего заказов:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
						<p className='flex items-center gap-3 text-sm'>
							<LiaStar className='text-yellow-500 w-5 h-5' />
							Всего товаров в избранных:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
						<p className='flex items-center gap-3 text-sm'>
							<LiaMoneyCheckAltSolid className='text-green-500 w-5 h-5' />
							Общая сумма заказов:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
						<p className='flex items-center gap-3 text-sm'>
							<LiaComments className='text-blue-500 w-5 h-5' />
							Всего отзывов:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
						<p className='flex items-center gap-3 text-sm'>
							<LiaQuestionCircle className='text-purple-500 w-5 h-5' />
							Всего вопросов:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
						<p className='flex items-center gap-3 text-sm'>
							<LiaHandPointUp className='text-red-500 w-5 h-5' />
							Всего ответов:{' '}
							<span className='font-semibold text-primary'>0</span>
						</p>
					</div>
				</section>

				<CardFooter className='flex flex-col items-start gap-2 px-0 pb-0 mt-aut0'>
					<CardTitle className='text-lg font-semibold'>
						О вашем профиле
					</CardTitle>
					<CardDescription className='text-muted-foreground'>
						Здесь вы можете отслеживать ваши заказы, просматривать и
						редактировать избранное, настройки, платёжные данные и отзывы. Ваш
						профиль поможет вам управлять всеми удобствами нашего магазина.
					</CardDescription>
				</CardFooter>
			</CardContent>
		</Card>
	)
}

export default MainProfile
