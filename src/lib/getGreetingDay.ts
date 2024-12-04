import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const getFriendlyMessage = () => {
	const today = new Date()

	// День недели в именительном падеже
	const dayOfWeek = format(today, 'EEEE', {
		locale: ru,
	}) as keyof typeof dayOfWeekMapping

	// Словарь для склонений
	const dayOfWeekMapping = {
		понедельник: 'понедельника',
		вторник: 'вторника',
		среда: 'среды',
		четверг: 'четверга',
		пятница: 'пятницы',
		суббота: 'субботы',
		воскресенье: 'воскресенья',
	} as const

	// Преобразуем день недели в нужную форму
	const dayOfWeekInGenitive = dayOfWeekMapping[dayOfWeek]

	return `Приятного вам дня ${dayOfWeekInGenitive}!`
}

export default getFriendlyMessage

// Пример использования
console.log(getFriendlyMessage())
