import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { pluralize } from 'numeralize-ru'
import RecentSaleCard from './RecentSaleCard'
const recentSales = [
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Иван Иванов',
		email: 'ivan.ivanov@example.com',
		total: 1200,
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Мария Петрова',
		email: 'maria.petrova@example.com',
		total: 800,
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Алексей Смирнов',
		email: 'alexey.smirnov@example.com',
		total: 1500,
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Ольга Кузнецова',
		email: 'olga.kuznetsova@example.com',
		total: 950,
	},
	{
		avatar: 'https://via.placeholder.com/150',
		name: 'Ольга Кузнецова',
		email: 'olga.kuznetsova@example.com',
		total: 950,
	},
]

const MainRecentSales = ({}) => {
	const salesCount = 1239

	return (
		<Card className='h-full max-h-full overflow-y-auto pb-0 '>
			<CardHeader>
				<CardTitle>Недавние продажи</CardTitle>
				<CardDescription>
					Магазин продал {salesCount}{' '}
					{pluralize(salesCount, 'товар', 'товара', 'товаров')} в этом месяце
				</CardDescription>
				<CardContent className=' overflow-y-auto p-0 flex flex-col gap-8 pt-5'>
					{recentSales.slice(0, 5).map((sale, index) => (
						<RecentSaleCard key={index} {...sale}></RecentSaleCard>
					))}
				</CardContent>
			</CardHeader>
		</Card>
	)
}

export default MainRecentSales
