import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideIcon } from 'lucide-react'

export function TooltipComponent({
	Icon,
	text,
}: {
	Icon: LucideIcon
	text: string
}) {
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Icon />
				</TooltipTrigger>
				<TooltipContent side='bottom'>
					<p className='max-w-[300px]'>{text}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
