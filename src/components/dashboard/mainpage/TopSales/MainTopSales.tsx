import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import TopSalesCard from './TopSalesCard'
const appleProducts = [
	{
		name: 'iPhone 14',
		img: '',
	},
	{
		name: 'MacBook Air M2',
		img: '',
	},
	{
		name: 'iPad Pro',
		img: '',
	},
	{
		name: 'Apple Watch Series 7',
		img: '',
	},
	{
		name: 'AirPods Pro',
		img: '',
	},
]

const MainTopSales = ({}) => {
	return (
		<Card className='md:flex-row flex-col flex'>
			<CardHeader className='px-4 flex flex-col justify-between whitespace-nowrap'>
				<div>
					<CardTitle className=''>Самые продаваемые товары:</CardTitle>
					<CardDescription>
						<p>Товары которые покупают чаще всего</p>
					</CardDescription>
				</div>
				<CardDescription className='text-[10px]'>
					Посмотреть все можно во вкладке Товары*
				</CardDescription>
			</CardHeader>
			<CardContent className='py-4 md:flex-row flex-col flex gap-4 w-full'>
				{appleProducts.map((_, index) => (
					<div className='w-1/5' key={index}>
						<TopSalesCard name={_.name} img={_.img} key={index}></TopSalesCard>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export default MainTopSales
