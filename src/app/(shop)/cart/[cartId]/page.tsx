// import MainCart from '@/components/cart/MainCart'
import MockCart from '@/components/cart/MockCart/MockCart'

type PageParams = Promise<{ cartId: string }>

const page = async ({ params }: { params: PageParams }) => {
	const { cartId } = await params
	console.log(cartId)
	return (
		<div className='h-full'>
			{/* <MainCart /> */}
			<MockCart></MockCart>
		</div>
	)
}

export default page
