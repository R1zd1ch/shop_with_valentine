import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const TopSalesCard = ({ name, img }: { name: string; img: string }) => {
	return (
		<Card className='group relative'>
			<CardHeader className='p-1'>
				<CardTitle className='absolute z-10 bottom-3 right-4 text-md'>
					<p className='max-w-[130px] text-right '>{name}</p>
				</CardTitle>

				<div className='relative w-full h-20 rounded-lg overflow-hidden'>
					<Image
						src={img || 'https://via.placeholder.com/150'}
						alt={name}
						fill
						className='object-cover rounded-md'
					/>
					{/* <div className='absolute inset-0 bg-gradient-to-tl from-white/50 via-white/20 dark:from-black/50 dark:via-black/20 to-transparent'></div> */}
					<div className='absolute inset-0 bg-gradient-to-tl from-background/60 via-background/30 to-transparent'></div>

					<div className='opacity-0  absolute z-20 flex w-full h-full items-end justify-start p-2 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100'>
						<Button>К товару</Button>
					</div>
				</div>
			</CardHeader>
		</Card>
	)
}

export default TopSalesCard
