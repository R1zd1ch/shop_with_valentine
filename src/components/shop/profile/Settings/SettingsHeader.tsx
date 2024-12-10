import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings } from 'lucide-react'

const SettingsHeader = ({}) => {
	return (
		<CardHeader className='min-h-[100px]'>
			<CardTitle className='flex items-center gap-2 text-primary '>
				Настройки
				<Settings />
			</CardTitle>
			<CardDescription className='text-muted-foreground'>
				Здесь вы можете управлять своими настройками
			</CardDescription>
		</CardHeader>
	)
}

export default SettingsHeader
