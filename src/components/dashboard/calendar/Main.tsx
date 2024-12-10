import { Badge } from '@/components/ui/badge'
import { TooltipComponent } from '../tooltip'
import { Calendar as CalendarIcon } from 'lucide-react'
import Calendar from './Calendar'
import { Card } from '@/components/ui/card'
import UpcomingEvents from './UpcomingEvents'
import CurrentTasks from './CurrentTasks'
import SalesStats from './SalesStats'

const typeSelect = [
	{
		name: 'Поставка',
		color: 'bg-blue-500',
	},
	{
		name: 'Акция',
		color: 'bg-red-500',
	},
	{
		name: 'Прибыльный день',
		color: 'bg-green-500',
	},
	{
		name: 'Встреча',
		color: 'bg-purple-500',
	},
	{
		name: 'Задача',
		color: 'bg-yellow-500',
	},
	{
		name: 'Другое',
		color: 'bg-gray-500',
	},
]

const Main = ({}) => {
	return (
		<div className='flex flex-col gap-6 mx-2'>
			<div className='font-bold text-2xl w-fit ml-4 flex flex-row gap-2 items-center'>
				<p>Календарь</p>
				<TooltipComponent
					Icon={CalendarIcon}
					text='Здесь вы можете посмотреть прибыльные дни и даты поставки заказов, запланировать акции и события'
				></TooltipComponent>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div className='md:col-span-2'>
					<Calendar />
					<Card className='mt-4 flex flex-wrap gap-4 w-fit p-4'>
						{typeSelect.map((item, index) => (
							<Badge
								key={index}
								className={`${item.color} rounded-sm p-2 text-md hover:cursor-pointer no-select`}
							>
								{item.name}
							</Badge>
						))}
					</Card>
				</div>
				<div className='space-y-6'>
					<CurrentTasks />
					<UpcomingEvents></UpcomingEvents>
					<SalesStats />
				</div>
			</div>
		</div>
	)
}

export default Main
