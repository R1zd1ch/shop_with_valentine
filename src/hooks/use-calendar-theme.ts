import { useTheme } from 'next-themes'
import { useMemo } from 'react'
import { CalendarEvent } from '@/storage/UseCalendarStore'

export const useCalendarStyles = () => {
	const { theme } = useTheme()

	const calendarStyles = useMemo(() => {
		return `
      .rbc-calendar {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      .rbc-toolbar button {
        color: hsl(var(--primary));
        border-color: hsl(var(--primary));
      }
      .rbc-toolbar button:hover {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      .rbc-toolbar button.rbc-active {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      .rbc-month-view, .rbc-time-view, .rbc-agenda-view {
        border-color: hsl(var(--border));
      }
      .rbc-off-range-bg {
        background-color: hsl(var(--muted));
      }
      .rbc-today {
        background-color: hsl(var(--accent));
      }
      .rbc-event {
        border-radius: var(--radius);
      }
      .rbc-event-content {
        font-size: 0.875rem;
      }
    `
	}, [theme])

	const eventStyleGetter = (event: CalendarEvent) => {
		const style: React.CSSProperties = {
			backgroundColor: '',
			borderRadius: '0.5rem',
			opacity: 0.8,
			color: 'hsl(var(--primary-foreground))',
			border: 'none',
			display: 'block',
			textAlign: 'center',
			lineHeight: '1.5',
			fontWeight: '500',
			padding: '4px 6px',
		}

		const colorMapping: Record<string, string> = {
			delivery: 'hsl(var(--chart-1))',
			promotion: 'hsl(var(--chart-2))',
			profitable: 'hsl(var(--chart-3))',
			meeting: 'hsl(var(--chart-4))',
			task: 'hsl(var(--chart-5))',
		}

		style.backgroundColor = colorMapping[event.type] || 'hsl(var(--muted))'

		if (event.completed) {
			style.textDecoration = 'line-through'
			style.opacity = 0.5
		}

		return { style }
	}

	return { calendarStyles, eventStyleGetter }
}
