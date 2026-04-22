/**
 * Shared utility functions for lending prototypes.
 * All functions are pure — no side effects, no DOM access.
 */

/**
 * Formats a number as Dutch Euro currency.
 * @param {number} amount
 * @param {string} locale
 * @param {string} currency
 * @returns {string} e.g. "€ 125.000,00"
 */
export function formatCurrency(amount, locale = 'nl-NL', currency = 'EUR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a decimal as a percentage string.
 * @param {number} rate — decimal (e.g. 0.065 for 6.5%)
 * @param {number} decimals
 * @returns {string} e.g. "6.50%"
 */
export function formatPercent(rate, decimals = 2) {
  return `${(rate * 100).toFixed(decimals)}%`;
}

/**
 * Formats a date string for Dutch display.
 * @param {string|Date} dateStr
 * @param {string} locale
 * @returns {string} e.g. "22 april 2026"
 */
export function formatDate(dateStr, locale = 'nl-NL') {
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Calculates the monthly annuity payment for a loan.
 * @param {number} principal — loan amount in euros
 * @param {number} annualRate — annual interest rate as decimal (e.g. 0.065)
 * @param {number} termMonths — loan term in months
 * @returns {number} monthly payment amount
 */
export function calculateMonthlyPayment(principal, annualRate, termMonths) {
  if (annualRate === 0) return principal / termMonths;
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/**
 * Calculates the total cost of credit (total repaid minus principal).
 * @param {number} principal
 * @param {number} annualRate — as decimal
 * @param {number} termMonths
 * @returns {number} total interest cost
 */
export function calculateTotalCost(principal, annualRate, termMonths) {
  const monthly = calculateMonthlyPayment(principal, annualRate, termMonths);
  return (monthly * termMonths) - principal;
}

/**
 * Calculates the total amount repaid (principal + interest).
 * @param {number} principal
 * @param {number} annualRate — as decimal
 * @param {number} termMonths
 * @returns {number}
 */
export function calculateTotalRepayment(principal, annualRate, termMonths) {
  const monthly = calculateMonthlyPayment(principal, annualRate, termMonths);
  return monthly * termMonths;
}

/**
 * Converts a string to a URL-safe slug.
 * @param {string} str
 * @returns {string} e.g. "sme-loan-application"
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generates a pseudo-unique ID string suitable for HTML id/for association.
 * Not cryptographically secure — prototype use only.
 * @param {string} prefix
 * @returns {string} e.g. "field-a3f7b"
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Standard debounce — delays fn execution until after delay ms have elapsed
 * since the last call.
 * @param {Function} fn
 * @param {number} delay — milliseconds
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Clamps a numeric value between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formats a KVK number with correct 8-digit padding.
 * @param {string|number} kvk
 * @returns {string} e.g. "08765432"
 */
export function formatKvk(kvk) {
  return String(kvk).padStart(8, '0');
}

/**
 * Formats an IBAN for display (groups of 4).
 * @param {string} iban
 * @returns {string} e.g. "NL91 ABNA 0417 1643 00"
 */
export function formatIban(iban) {
  const clean = iban.replace(/\s/g, '').toUpperCase();
  return clean.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Calculates the Debt Service Coverage Ratio.
 * DSCR = annual EBITDA / annual debt service
 * @param {number} ebitda — annual EBITDA
 * @param {number} annualDebtService — total annual loan repayments
 * @returns {number} DSCR ratio (1.2+ is typically acceptable)
 */
export function calculateDSCR(ebitda, annualDebtService) {
  if (annualDebtService === 0) return Infinity;
  return ebitda / annualDebtService;
}
