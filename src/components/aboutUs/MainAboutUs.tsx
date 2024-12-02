import AboutIntro from './AboutIntro'
import OurValues from './OurValues'
import Specialization from './Specialization'
import WhyChooseUs from './WhyChoicesUs'

const MainAboutUs = ({}) => {
	return (
		<div className='max-w-screen-2xl mx-auto'>
			<div className='md:mx-[100px] flex flex-col  items-start justify-center gap-5'>
				<div className='flex md:flex-row md:gap-5 flex-col gap-4 w-full'>
					<AboutIntro />
					<OurValues></OurValues>
				</div>
				<div className='flex md:flex-row md:gap-5 flex-col gap-4 w-full'>
					<Specialization></Specialization>
					<WhyChooseUs></WhyChooseUs>
				</div>
			</div>
		</div>
	)
}

export default MainAboutUs
