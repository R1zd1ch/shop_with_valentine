import { CardHeader, CardTitle } from '@/components/ui/card'
// import { Reset, Save, Back } from '../Buttons'
import { Reset, Back } from '../Buttons'

const Header = ({}) => {
	return (
		<CardHeader className='p-4 flex items-center justify-between flex-row lg:px-8'>
			<div className='flex flex-col  gap-2'>
				<CardTitle className='p-0'>Добавление товара</CardTitle>
				<p className='text-sm text-muted-foreground'>
					Введите все обязательные поля, чтобы товар корректно отображался
				</p>
			</div>
			<div className='flex flex-row gap-4'>
				<Back></Back>
				<Reset></Reset>
				{/* TODO: Дописать сохранение */}
				{/* <Save></Save> */}
			</div>
		</CardHeader>
	)
}

export default Header
