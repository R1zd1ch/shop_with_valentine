import { LiaSadTear } from 'react-icons/lia'

const QAndAEmptyState = ({ text }: { text: string }) => (
	<div className='flex flex-col items-center justify-center gap-4'>
		<LiaSadTear className='w-16 h-16 text-muted-foreground' />
		<p className='text-muted-foreground text-center'>{text}</p>
	</div>
)

export default QAndAEmptyState
