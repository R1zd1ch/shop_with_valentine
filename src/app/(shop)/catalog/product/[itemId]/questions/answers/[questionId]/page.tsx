import MainAnswerPage from '@/components/catalog/item-card/AnswerPage/MainAnswerPage'

import { SearchParams } from 'next/dist/server/request/search-params'

const Answers = async ({ params }: { params: SearchParams }) => {
	const { itemId, questionId } = await params
	const productId = itemId as string
	const questionIdString = questionId as string
	console.log(await params)
	return (
		<>
			<MainAnswerPage
				productId={productId}
				questionId={questionIdString}
			></MainAnswerPage>
		</>
	)
}

export default Answers
