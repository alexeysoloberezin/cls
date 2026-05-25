function formatDateTime(dateStr: string): string {
    if (!dateStr) return ''

    const date = new Date(dateStr)

    if (isNaN(date.getTime()) || date.getTime() === 0) {
        return ''
    }

    const time = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        hour12: false
    })

    const dateFormatted = date.toLocaleDateString('ru-RU', {
        timeZone: 'UTC'
    })

    return `${time} / ${dateFormatted}`
}

export default formatDateTime;
