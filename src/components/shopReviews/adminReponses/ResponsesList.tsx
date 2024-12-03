import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ResponsesCard from './ResponsesCard'
import { AdminResponse } from '@/storage/UseStoreReviews'

const ResponsesList = ({ responses }: { responses: AdminResponse[] }) => {
	return (
		<Card className='w-full min-h-[50vh] max-h-[75vh]'>
			<CardHeader className='border-b-2'>
				<CardTitle>Ответы от администрации</CardTitle>
			</CardHeader>
			<CardContent className=' max-h-[50vh] flex flex-col gap-4 overflow-y-scroll px-0 lg:px-4 pt-4 '>
				{responses.length === 0 ? (
					<p className='text-center'>Нет отзывов от администрации</p>
				) : (
					responses.map((response: AdminResponse, index) => (
						<ResponsesCard key={index} adminResponse={response}></ResponsesCard>
					))
				)}
			</CardContent>
		</Card>
	)
}

export default ResponsesList
