import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@radix-ui/react-toast'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

const InterFont = Inter({
	weight: ['400', '700', '900', '100'],
	subsets: ['latin', 'cyrillic'],
})

const roboto = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={` ${InterFont.className}

				antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					disableTransitionOnChange
				>
					<ToastProvider swipeDirection='right'>
						<div className='transition-colors duration-800 ease-in-out'></div>
						{children}
					</ToastProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
