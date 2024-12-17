/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageUpload } from '../image-upload'
import { X } from 'lucide-react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import imageCompression from 'browser-image-compression' // Импорт библиотеки сжатия
import { v4 as uuid } from 'uuid'

export function ImageUploadField({ form, store }: { form: any; store: any }) {
	const [uploadingFiles, setUploadingFiles] = useState<File[]>([]) // Отслеживаем файлы в процессе загрузки

	// Функция для сжатия изображения
	const compressImage = async (file: File): Promise<File> => {
		const options = {
			maxSizeMB: 1, // Максимальный размер изображения (в мегабайтах)
			maxWidthOrHeight: 1920, // Максимальная ширина или высота изображения
			useWebWorker: true, // Использовать Web Worker для производительности
			fileType: 'image/jpeg', // Тип сжатого файла
		}
		try {
			const compressedFile = await imageCompression(file, options)
			return compressedFile
		} catch (error) {
			console.error('Ошибка сжатия изображения:', error)
			return file // Если произошла ошибка, возвращаем оригинал
		}
	}

	// Функция для загрузки изображения в Supabase
	const uploadToSupabase = async (file: File): Promise<string | null> => {
		const fileName = `${uuid()}`

		const { data, error } = await supabase.storage
			.from('images') // Замените на имя вашего бакета
			.upload(fileName, file)

		if (error) {
			console.error('Ошибка загрузки в Supabase:', error)
			return null
		}

		// Генерация публичного URL
		const { publicUrl } = supabase.storage
			.from('images')
			.getPublicUrl(data.path).data

		return publicUrl
	}

	const handleImagesUpload = useCallback(
		async (files: File[]) => {
			setUploadingFiles(prev => [...prev, ...files]) // Добавляем файлы в загрузку

			// Сжатие изображений и загрузка
			const compressedAndUploadedUrls = await Promise.all(
				files.map(async file => {
					const compressedFile = await compressImage(file) // Сжатие изображения
					return await uploadToSupabase(compressedFile) // Загрузка сжатого файла
				})
			)

			// Фильтрация успешных загрузок
			const validUrls = compressedAndUploadedUrls.filter(
				(url): url is string => url !== null
			)

			// Обновляем состояние
			const newImgUrls = [...store.img, ...validUrls]
			store.setField('img', newImgUrls)
			form.setValue('img', newImgUrls)

			// Убираем завершенные загрузки
			setUploadingFiles(prev =>
				prev.filter(uploadingFile =>
					files.every(file => file.name !== uploadingFile.name)
				)
			)
		},
		[store, form]
	)

	const removeImage = useCallback(
		(index: number) => {
			const newImgUrls = store.img.filter((_: any, i: number) => i !== index)
			store.setField('img', newImgUrls)
			form.setValue('img', newImgUrls)
		},
		[store, form]
	)

	return (
		<FormField
			control={form.control}
			name='img'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Изображения</FormLabel>
					<FormControl>
						<ImageUpload onImagesUpload={handleImagesUpload} />
					</FormControl>
					<FormDescription>
						Перетащите изображения или кликните для выбора файлов
					</FormDescription>
					<FormMessage />
					<div className='mt-4 flex flex-row flex-wrap gap-2'>
						{/* Скелетоны для загружаемых файлов */}
						{uploadingFiles.map((file, index) => (
							<Skeleton
								key={`uploading-${index}`}
								className='w-24 h-24 rounded-md'
							/>
						))}

						{/* Загруженные изображения */}
						{field.value.length > 0 &&
							field.value.map((url: string, index: number) => (
								<div key={index} className='relative w-24 h-24'>
									<Image
										src={url}
										alt={`Uploaded ${index + 1}`}
										layout='fill'
										objectFit='cover'
										className='rounded-md'
									/>
									<button
										type='button'
										onClick={() => removeImage(index)}
										className='absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600'
									>
										<X className='h-4 w-4' />
									</button>
								</div>
							))}
					</div>
				</FormItem>
			)}
		/>
	)
}
