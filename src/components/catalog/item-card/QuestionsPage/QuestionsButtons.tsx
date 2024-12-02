import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const QuestionsButtons = ({}) => {
	return (
		<Card className='w-full h-full flex items-center justify-center min-h-[100px]'>
			<div className='flex flex-row gap-2'>
				<Button>В избранное</Button>
				<Button>В корзину</Button>
			</div>
		</Card>
	)
}

export default QuestionsButtons
