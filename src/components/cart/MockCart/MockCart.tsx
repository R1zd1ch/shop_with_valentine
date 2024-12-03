'use client'
import CartRightSide from './CartRightSide'
import CartList from './CartItems'
import useCartStore from '@/storage/UseCartStore' // Путь к zustand-хранилищу

const MainCart = () => {
	const { CartItems, setCurrentItem, updateItem, removeItem } = useCartStore()

	const handleRemoveItem = (id: number) => removeItem(id)

	const IncItem = (id: number) => {
		const item = CartItems.find(i => i.id === id)
		if (item) {
			setCurrentItem({ ...item, quantity: item.quantity + 1 })
			updateItem()
		}
	}

	// useEffect(() => {
	// 	loadMockData()
	// }, [])

	const DecItem = (id: number) => {
		const item = CartItems.find(i => i.id === id)
		if (item) {
			const newQuantity = item.quantity - 1
			if (newQuantity > 0) {
				setCurrentItem({ ...item, quantity: newQuantity })
				updateItem()
			} else {
				removeItem(id)
			}
		}
	}

	return (
		<div className='w-full max-w-screen-2xl mx-auto'>
			<div className='flex flex-col md:flex-row md:mx-[100px] gap-6'>
				{/* Левая часть: CartItems */}
				<div className='flex-1'>
					<CartList
						items={CartItems}
						onRemoveItem={handleRemoveItem}
						onIncItem={IncItem}
						onDecItem={DecItem}
					/>
				</div>

				{/* Правая часть: CartRightSide */}
				<div className='w-full md:w-[30%]'>
					<CartRightSide
						priceList={CartItems.map(item => item.price * item.quantity)}
					/>
				</div>
			</div>
		</div>
	)
}

export default MainCart