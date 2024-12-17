import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ImageUploadProps {
	onImagesUpload: (files: File[]) => void
}

export function ImageUpload({ onImagesUpload }: ImageUploadProps) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onImagesUpload(acceptedFiles)
		},
		[onImagesUpload]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
		},
		multiple: true,
	})

	return (
		<div
			{...getRootProps()}
			className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
				isDragActive
					? 'border-primary bg-primary/10'
					: 'border-gray-300 hover:border-primary'
			}`}
		>
			<input {...getInputProps()} />
			<Upload className='mx-auto h-12 w-12 text-gray-400' />
			<p className='mt-2 text-sm text-gray-600'>
				{isDragActive
					? 'Отпустите файлы, чтобы загрузить их'
					: 'Перетащите изображения сюда или кликните для выбора'}
			</p>
		</div>
	)
}
