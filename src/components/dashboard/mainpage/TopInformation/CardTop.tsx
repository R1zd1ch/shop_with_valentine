import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideProps } from 'lucide-react'

const CardTop = ({
	Icon,
	title,
	content,
	bottom,
}: {
	Icon: React.ComponentType<LucideProps>
	title: string
	content: string
	bottom: string
}) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-md'>{title}</CardTitle> {/* Dynamic title */}
				<Icon className='w-6 h-6 text-primary' /> {/* Dynamic Icon */}
			</CardHeader>
			<CardContent>
				<p className='text-2xl font-bold'>{content}</p> {/* Dynamic content */}
				<p className='text-xs text-muted-foreground'>
					{bottom} чем за прошлый месяц
				</p>{' '}
				{/* Dynamic bottom text */}
			</CardContent>
		</Card>
	)
}

export default CardTop
