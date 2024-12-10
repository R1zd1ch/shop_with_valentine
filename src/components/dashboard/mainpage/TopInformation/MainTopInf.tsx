import {
	LucideProps,
	RussianRuble,
	Users,
	CreditCard,
	Activity,
} from 'lucide-react'
import CardTop from './CardTop'

const data: {
	title: string
	icon: React.ComponentType<LucideProps>
	content: string
	bottom: string
}[] = [
	{
		title: 'Общий доход',
		icon: RussianRuble,
		content: '₽+700,000.00',
		bottom: '+2.1%',
	},
	{
		title: 'Покупателей',
		icon: Users,
		content: '+2 000',
		bottom: '+10%',
	},
	{
		title: 'Продажи',
		icon: CreditCard,
		content: '₽+2,320,000.00',
		bottom: '+4%',
	},
	{
		title: 'Заказов за месяц',
		icon: Activity,
		content: '1239',
		bottom: '+7%',
	},
]

const MainTopInf = ({}) => {
	return (
		<div className='grid lg:grid-cols-4 gap-4'>
			{data.map((dataItem, index) => (
				<div key={index} className='col-span-1'>
					<CardTop
						Icon={dataItem.icon}
						title={dataItem.title}
						content={dataItem.content}
						bottom={dataItem.bottom}
					></CardTop>
				</div>
			))}
		</div>
	)
}

export default MainTopInf
