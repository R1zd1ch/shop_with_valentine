import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const RightBar = ({ responsesCount }: { responsesCount: number }) => {
	return (
		<Card>
			<CardHeader className='pb-4'>
				<CardTitle className='text-xl text-primary'>
					Мы очень благодарны вам за ваш отзыв! ♡
				</CardTitle>
			</CardHeader>
			<CardContent className='pt-0'>
				<div>
					<p>Всего ответов от администрации: {responsesCount}</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default RightBar
