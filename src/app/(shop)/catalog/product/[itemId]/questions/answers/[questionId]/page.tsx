import MainAnswerPage from '@/components/catalog/item-card/AnswerPage/MainAnswerPage'

const Answers = async ({
	params,
}: {
	params: Promise<{ itemId: string; questionId: string }>
}) => {
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
