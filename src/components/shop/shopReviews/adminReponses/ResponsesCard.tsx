import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { AdminResponse } from '@/storage/UseStoreReviews'

const ResponsesCard = ({ adminResponse }: { adminResponse: AdminResponse }) => {
	return (
		<Card className='max-w-full lg:flex-row flex-col flex p-4'>
			<CardHeader className='flex flex-row items-start justify-between p-0 pb-4 lg:pb-0'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar className='w-20 h-20'>
						<AvatarImage
							src='https://via.placeholder.com/150'
							alt={adminResponse.username}
						/>
						<AvatarFallback>
							{adminResponse.username
								.split(' ')
								.map(word => word[0])
								.join('')
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col items-start min-w-[100px]'>
						<CardTitle>{adminResponse.username}</CardTitle>

						<p className='text-sm text-muted-foreground'>
							{format(new Date(adminResponse.createdAt), 'd MMMM yyyy', {
								locale: ru,
							})}
						</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className='max-w-full p-0'>
				<div className='lg:pl-12 lg:pr-36'>
					<CardDescription className='text-muted-foreground mb-1 text-sm'>
						Ответ администратора:
					</CardDescription>
					<p className='text-card-foreground break-words'>
						{adminResponse.content}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default ResponsesCard
