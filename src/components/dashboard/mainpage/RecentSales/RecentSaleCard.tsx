import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const RecentSaleCard = ({
	avatar,
	name,
	email,
	total,
}: {
	avatar: string
	name: string
	email: string
	total: number
}) => {
	return (
		<div className='flex items-center gap-4'>
			<Avatar className='h-9 w-9'>
				<AvatarImage src={avatar || ''} alt={name} />
				<AvatarFallback className='rounded-lg'>{name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div className='flex flex-1 flex-wrap items-center justify-between'>
				<div className='space-y-1'>
					<p className='text-sm font-medium leading-none'>{name}</p>
					<p className='text-sm text-muted-foreground'>{email}</p>
				</div>
				<div className='font-medium'>+₽{total}</div>
			</div>
		</div>
	)
}

export default RecentSaleCard
