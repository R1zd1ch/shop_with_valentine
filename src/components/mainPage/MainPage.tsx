'use client'
import MainBanner from './MainBanner'
import MainCategory from './MainCategory'
import MainPopularItems from './MainPopularItems'
import MainReviews from './MainReviews'
import MainStock from './MainStock'

const MainPage = ({}) => {
	return (
		<>
			<div className='flex flex-col gap-10'>
				<MainBanner></MainBanner>
				<div className='w-full max-w-screen-2xl mx-auto'>
					<div className='md:mx-[100px] flex flex-col gap-10'>
						<MainCategory></MainCategory>
						<MainPopularItems></MainPopularItems>
						<MainStock></MainStock>
						<MainReviews></MainReviews>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainPage
