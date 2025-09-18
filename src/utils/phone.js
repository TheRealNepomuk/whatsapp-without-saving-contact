// Utility functions for phone number formatting and validation

// Constants
export const PHONE_NUMBER_CONSTRAINTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 15,
  MIN_DIGITS_FOR_COUNTRY_CODE_WARNING: 6,
  MAX_DIGITS_FOR_COUNTRY_CODE_WARNING: 10,
};

/**
 * Clean a raw input string to digits only and remove leading zeros.
 * Also handles common prefixes like '+' by stripping non-digits first.
 */
export function sanitizePhoneInput(raw) {
  if (typeof raw !== 'string') return '';
  let digits = raw.replace(/[^0-9]/g, '');
  // Remove leading zeros
  digits = digits.replace(/^0+/, '');
  return digits;
}

/**
 * Determine if a sanitized phone number looks valid for WhatsApp URL.
 * Very lightweight: requires at least 8 digits and at most 15 (E.164 max).
 */
export function isLikelyValidPhoneNumber(digitsOnly) {
  if (!digitsOnly) return false;
  const length = digitsOnly.length;
  return length >= PHONE_NUMBER_CONSTRAINTS.MIN_LENGTH && 
         length <= PHONE_NUMBER_CONSTRAINTS.MAX_LENGTH;
}

/**
 * Check if a phone number input might be missing a country code.
 * Returns true if the number has 6-10 digits and doesn't start with + or 00.
 */
export function mightBeMissingCountryCode(input) {
  if (!input) return false;
  const digits = input.replace(/[^0-9]/g, '');
  return digits.length >= PHONE_NUMBER_CONSTRAINTS.MIN_DIGITS_FOR_COUNTRY_CODE_WARNING && 
         digits.length <= PHONE_NUMBER_CONSTRAINTS.MAX_DIGITS_FOR_COUNTRY_CODE_WARNING && 
         !input.startsWith('00') && 
         !input.startsWith('+');
}

/**
 * Build WhatsApp API URL: https://api.whatsapp.com/send/?phone=FORMATTED_NUMBER
 */
export function buildWhatsAppUrl(digitsOnly) {
  return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(digitsOnly)}`;
}


