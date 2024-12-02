'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface BackButtonProps {
	className?: string
	pushUrl?: string
	children?: React.ReactNode
	variant?:
		| 'default'
		| 'destructive'
		| 'ghost'
		| 'link'
		| 'secondary'
		| 'outline'
}

const BackButton: React.FC<BackButtonProps> = ({
	className,
	pushUrl = '/main',
	variant = 'default',
	children,
}) => {
	const router = useRouter()

	const handleBack = () => {
		router.push(pushUrl)
	}
	return (
		<Button onClick={handleBack} className={clsx(className)} variant={variant}>
			<ArrowLeft />
			{children}
		</Button>
	)
}

export default BackButton
