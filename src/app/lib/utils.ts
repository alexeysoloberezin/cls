import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T>(
  updaterOrValue: T | ((prev: T) => T),
  currentValue: T
): T {
  return typeof updaterOrValue === 'function'
    ? (updaterOrValue as (prev: T) => T)(currentValue)
    : updaterOrValue;
}
