import { FC } from 'react'
import { Card, CardHeader, CardTitle } from '../../ui/card'

const HeaderShopReviews: FC = ({}) => {
	return (
		<Card className='w-full  shadow-md shadow-black/20'>
			<CardHeader>
				<CardTitle className='text-2xl font-bold '>
					Отзывы о нашем магазине{' '}
					<span className='text-primary underline'>GadgetStore</span>
				</CardTitle>
				<div>
					<p className='text-muted-foreground'>
						Ваше мнение очень важно для нас! Оставьте отзыв о нашем магазине,
						чтобы мы могли стать ещё лучше.
					</p>
				</div>
			</CardHeader>
		</Card>
	)
}

export default HeaderShopReviews
