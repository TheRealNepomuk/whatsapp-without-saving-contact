// Utility functions for phone number formatting and validation

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
  return length >= 8 && length <= 15;
}

/**
 * Build WhatsApp API URL: https://api.whatsapp.com/send/?phone=FORMATTED_NUMBER
 */
export function buildWhatsAppUrl(digitsOnly) {
  return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(digitsOnly)}`;
}


