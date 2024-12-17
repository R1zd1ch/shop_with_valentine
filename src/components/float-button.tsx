/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { LayoutDashboard, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const FloatButton = () => {
	const [isOpen, setIsOpen] = useState(true)
	const currentPath = usePathname()

	const isDashboard = currentPath.includes('dashboard')
	const buttonText = isDashboard ? 'Shop' : 'Dashboard'
	const buttonHref = isDashboard ? '/main' : '/dashboard'

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		e.preventDefault()
		setIsOpen(false)
	}

	if (!isOpen) {
		return null
	}

	return (
		<div className='fixed bottom-6 right-6 z-50 flex items-center justify-center'>
			<Link href={buttonHref} className='group relative'>
				<Button
					size='lg'
					className='shadow-lg hover:shadow-xl flex items-center justify-end transition-all duration-500 ease-in-out max-w-[50px] group-hover:max-w-[200px] overflow-hidden whitespace-nowrap px-2'
				>
					<div
						className='absolute -left-3 -top-2.5 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 hover:scale-110 hover:shadow-lg hover:shadow-muted/50 cursor-pointer bg-muted p-1 rounded-full hover:bg-muted-dark'
						onClick={handleClick}
					>
						<X className='text-foreground hover:text-accent transition-colors duration-300 ease-in-out' />
					</div>

					<span className='mr-2 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100'>
						{buttonText}
					</span>

					<LayoutDashboard className='mr-2.5' />
				</Button>
			</Link>
		</div>
	)
}

export default FloatButton
