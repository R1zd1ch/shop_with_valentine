import MainTopInf from './TopInformation/MainTopInf'
import { Overview } from './Overview'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import MainRecentSales from './RecentSales/MainRecentSales'
import MainTopSales from './TopSales/MainTopSales'
import { TooltipComponent } from '../tooltip'
import { Home } from 'lucide-react'

const Main = ({}) => {
	return (
		<div className='flex flex-col gap-6 mx-2'>
			<div className='font-bold text-2xl w-fit ml-4 flex flex-row gap-2 items-center'>
				<p>Главная страница</p>
				<TooltipComponent
					Icon={Home}
					text='Здесь вы можете посмотреть краткую статистику'
				></TooltipComponent>
			</div>

			<MainTopInf></MainTopInf>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
				<div className='md:col-span-7'>
					<Card className='h-full flex flex-col items-start justify-center pr-4'>
						<CardHeader className='px-4'>
							<CardTitle className=''>Обзор</CardTitle>
							<CardDescription>График прибыли по месяцам</CardDescription>
						</CardHeader>
						<Overview></Overview>
					</Card>
				</div>
				<div className='md:col-span-5 h-full'>
					<MainRecentSales></MainRecentSales>
				</div>
			</div>
			<MainTopSales></MainTopSales>
		</div>
	)
}

export default Main
