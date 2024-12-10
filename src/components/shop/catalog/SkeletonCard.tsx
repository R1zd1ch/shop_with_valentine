import { Card } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'
const SkeletonCard = () => (
	<Card className='relative flex flex-col p-0 rounded-lg shadow-md bg-card'>
		<div className='relative rounded-lg overflow-hidden'>
			<Skeleton className='w-full h-40' />
		</div>
		<div className='p-4 flex flex-col space-y-2'>
			<Skeleton className='h-6 w-3/4' />
			<Skeleton className='h-4 w-1/2' />
			<Skeleton className='h-6 w-1/3' />
			<Skeleton className='h-8 w-full mt-4' />
		</div>
	</Card>
)

export default SkeletonCard
