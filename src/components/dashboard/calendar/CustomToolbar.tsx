interface CustomToolbarProps {
	onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | Date) => void
	onView: (View: 'month' | 'week' | 'day') => void
	label: string
	View: 'month' | 'week' | 'day'
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
	onNavigate,
	onView,
	label,
	View,
}) => {
	return (
		<div className='flex items-center justify-between mb-4'>
			{/* Управление навигацией */}
			<div>
				<button
					className='px-4 py-2 bg-muted text-muted-foreground rounded'
					onClick={() => onNavigate('TODAY')}
				>
					Сегодня
				</button>
				<button
					className='px-4 py-2 bg-muted text-muted-foreground rounded ml-2'
					onClick={() => onNavigate('PREV')}
				>
					Назад
				</button>
				<button
					className='px-4 py-2 bg-muted text-muted-foreground rounded ml-2'
					onClick={() => onNavigate('NEXT')}
				>
					Вперед
				</button>
			</div>

			{/* Заголовок текущей даты */}
			<span className='text-lg font-bold'>{label}</span>

			{/* Переключение вида */}
			<div>
				<button
					className={`px-4 py-2 ${
						View === 'day'
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
					} rounded ml-2`}
					onClick={() => onView('day')}
				>
					День
				</button>
				<button
					className={`px-4 py-2 ${
						View === 'week'
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
					} rounded ml-2`}
					onClick={() => onView('week')}
				>
					Неделя
				</button>
				<button
					className={`px-4 py-2 ${
						View === 'month'
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
					} rounded ml-2`}
					onClick={() => onView('month')}
				>
					Месяц
				</button>
			</div>
		</div>
	)
}

export default CustomToolbar
