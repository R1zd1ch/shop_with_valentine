import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const ReviewCardSkeleton = () => {
	return (
		<Card className='flex flex-col items-center text-center bg-card rounded-lg shadow min-h-[270px] sm:min-h-[300px] relative'>
			<CardHeader>
				<div className='text-right absolute right-4 text-xs text-muted-foreground'>
					<Skeleton className='w-24 h-4 inline-block' />
				</div>
				<div className='w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden'>
					<Skeleton className='w-full h-full rounded-full' />
				</div>
			</CardHeader>

			<CardContent className='mb-auto'>
				<h3 className='text-base sm:text-lg font-semibold text-foreground'>
					<Skeleton className='w-32 h-5 mb-2' />
				</h3>

				<div className='text-xs sm:text-sm text-muted-foreground italic'>
					<Skeleton className='w-48 h-4 mb-1' />
					<Skeleton className='w-40 h-4' />
				</div>
			</CardContent>

			<CardFooter className='w-full flex flex-row justify-end'>
				<div className='flex flex-row gap-1 text-xs text-primary w-full items-end justify-between'>
					<div className='flex flex-row items-center gap-2'>
						<Skeleton className='w-12 h-6 rounded-md' />
						<Skeleton className='w-12 h-6 rounded-md' />
					</div>
					<div className='flex flex-row gap-1 text-xs text-primary justify-end items-center'>
						<Skeleton className='w-24 h-4' />
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}

export default ReviewCardSkeleton
