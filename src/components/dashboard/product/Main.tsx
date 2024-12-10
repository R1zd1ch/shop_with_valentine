import { Card } from '@/components/ui/card'
import Header from './Header'
import Filter from './Filter'
import List from './List'

const Main = ({}) => {
	return (
		<div className='w-full flex flex-col'>
			<Card className='mx-2'>
				<Header></Header>
			</Card>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4 p-2'>
				<div className='md:col-span-3 h-[200px]'>
					<List></List>
				</div>
				<div className='col-span-1'>
					<Filter></Filter>
				</div>
			</div>
		</div>
	)
}

export default Main
