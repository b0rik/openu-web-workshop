import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const containsUpperLetter = (str: string) => /[A-Z]/.test(str);
export const containsLowerLetter = (str: string) => /[a-z]/.test(str);
export const containsDigit = (str: string) => /[0-9]/.test(str);
export const containsSymbol = (str: string) => /[#?!@$ %^&*-]/.test(str);
export const containsWhitespace = (str: string) => /\s/.test(str);
export const isDigits = (str: string) => /^\d+$/.test(str);
