export function isDate(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    const timestamp = Date.parse(value);
    return !isNaN(timestamp);
}

export function formatDate(value: unknown): string {
    if (typeof value !== 'string') return String(value);

    const timestamp = Date.parse(value);
    if (isNaN(timestamp)) return value; 

    const date = new Date(timestamp);

    const two = (n: number) => n.toString().padStart(2, '0');

    return (
        `${two(date.getDate())}.${two(date.getMonth() + 1)}.${date.getFullYear()} ` +
        `${two(date.getHours())}:${two(date.getMinutes())}:${two(date.getSeconds())}`
    );
}