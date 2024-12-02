import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const MainBanner = () => {
	return (
		<div className='relative bg-input text-foreground '>
			<div className='container mx-auto flex flex-col-reverse md:flex-row items-center  py-16'>
				{/* Текстовый блок */}
				<div className='w-full md:w-1/2 text-center md:text-left space-y-6 px-9 pt-10 sm:pt-0'>
					<h1 className='text-4xl md:text-6xl font-bold leading-tight'>
						Добро пожаловать в GStore
					</h1>
					<p className='text-lg md:text-xl text-muted-foreground'>
						Исследуйте последние гаджеты и аксессуары с невероятными ценами!
					</p>
					<Button className='bg-primary text-primary-foreground px-9 py-6 shadow-xl text-md'>
						К покупкам
					</Button>
				</div>

				{/* Изображение */}
				<div className='w-full md:w-1/2 flex justify-center '>
					<Image
						src='https://via.placeholder.com/600x400'
						width={600}
						height={400}
						alt='Tech gadgets'
						className='rounded-lg shadow-xl border border-border'
					/>
				</div>
			</div>
		</div>
	)
}

export default MainBanner
