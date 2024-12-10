import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MdOutlineQuestionAnswer } from 'react-icons/md'

const Header = ({
	toggledTab,
	setToggledTab,
}: {
	toggledTab: string
	setToggledTab: (tab: string) => void
}) => {
	return (
		<CardHeader
			className='min-h-[100px] flex flex-col lg:flex-row  items-center
			justify-between w-full'
		>
			<CardHeader className='p-0'>
				<CardTitle className='flex items-center gap-2 text-primary '>
					Отзывы и вопросы
					<MdOutlineQuestionAnswer className='w-6 h-6'></MdOutlineQuestionAnswer>
				</CardTitle>

				<CardDescription className='text-muted-foreground'>
					Здесь вы можете управлять своими отзывами и ответами
				</CardDescription>
			</CardHeader>

			<div className='flex flex-row gap-2 items-center'>
				<Button
					variant={toggledTab === 'reviews' ? 'default' : 'secondary'}
					size={'default'}
					onClick={() => setToggledTab('reviews')}
				>
					Отзывы
				</Button>
				<Button
					size={'default'}
					variant={toggledTab === 'questions' ? 'default' : 'secondary'}
					onClick={() => setToggledTab('questions')}
				>
					Вопросы
				</Button>
			</div>
		</CardHeader>
	)
}

export default Header
