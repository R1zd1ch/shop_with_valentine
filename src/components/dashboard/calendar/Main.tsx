import { TooltipComponent } from '../tooltip'
import { Calendar } from 'lucide-react'

const Main = ({}) => {
	return (
		<div className='flex flex-col gap-6 mx-2'>
			<div className='font-bold text-2xl w-fit ml-4 flex flex-row gap-2 items-center'>
				<p>Календарь</p>
				<TooltipComponent
					Icon={Calendar}
					text='Здесь вы можете посмотреть прибыльные дни и даты поставки заказов, запланировать акции и события'
				></TooltipComponent>
			</div>
		</div>
	)
}

export default Main
