'use client'

import * as React from 'react'
import { Moon, Sun, Palette } from 'lucide-react' // Импортируем иконку Palette
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	// Пока компонент не смонтирован, показываем иконку Palette
	if (!mounted) {
		return (
			<Button
				variant='ghost'
				className='hover:text-primary transition-colors duration-300'
			>
				<Palette width={40} height={40} /> {/* Иконка Palette */}
			</Button>
		)
	}

	// После монтирования отображаем иконки по теме
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
