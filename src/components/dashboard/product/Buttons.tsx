'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { useProductFormStore } from '@/storage/UseProductFormStore'

export const AddProduct = ({ link }: { link?: string }) => {
	return (
		<Link href={link || '#'}>
			<Button size={'default'}>Добавить товар</Button>
		</Link>
	)
}

export const Reset = () => {
	const { resetForm } = useProductFormStore()
	return (
		<Button size={'default'} onClick={resetForm}>
			Сбросить
		</Button>
	)
}

export const Back = () => {
	return (
		<Link href={'/dashboard/products'}>
			<Button size={'default'}>Назад</Button>
		</Link>
	)
}

export const Save = () => {
	return <Button size={'default'}>Сохранить</Button>
}

export const ViewInPage = ({ className = '' }: { className?: string }) => {
	return (
		<Link href={'/catalog'}>
			<Button size={'default'} variant={'ghost'} className={className}>
				Перейти на предпросмотр страницы товара
			</Button>
		</Link>
	)
}
