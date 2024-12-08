'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Skeleton } from './ui/skeleton'

export function ModeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setMounted(true)
		}, 500)
	}, [])

	if (!mounted) {
		return <Skeleton className='w-12 h-10'></Skeleton>
	}

	return (
		<Button
			variant='ghost'
			className='hover:text-primary transition-colors duration-300'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			{resolvedTheme === 'dark' ? (
				<Sun width={40} height={40} />
			) : (
				<Moon width={40} height={40} />
			)}
		</Button>
	)
}
