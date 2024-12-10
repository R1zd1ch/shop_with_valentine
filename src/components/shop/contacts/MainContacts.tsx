import { FC } from 'react'
import InformationContacts from './InformationContacts'
import FormContacts from './FormContacts'
import SocialMediaContacts from './SocialMediaContacts'

const MainContacts: FC = ({}) => {
	return (
		<div className='lg:mx-[100px] flex flex-col gap-6 items-center justify-center'>
			{/* <div className='grid grid-cols-1 md:grid-cols-2 gap-6 '> */}
			<div className='w-full  flex flex-col md:flex-row gap-6 justify-center'>
				<div className='w-full md:w-1/2'>
					<FormContacts></FormContacts>
				</div>
				<div className='w-full md:max-w-3xl flex-grow-1 flex'>
					<SocialMediaContacts></SocialMediaContacts>
				</div>
			</div>
			<InformationContacts></InformationContacts>
		</div>
	)
}

export default MainContacts
