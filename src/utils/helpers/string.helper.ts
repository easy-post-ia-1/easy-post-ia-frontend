/**
 * String manipulation helper functions
 */

/**
 * Trims text to a specified length and adds ellipsis if the text is longer
 * @param text - The text to trim
 * @param maxLength - Maximum length before trimming (default: 50)
 * @returns The trimmed text with ellipsis if needed
 */
export const trimText = (text: string, maxLength: number = 50): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalizes the first letter of a string
 * @param text - The text to capitalize
 * @returns The text with first letter capitalized
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converts a string to title case (first letter of each word capitalized)
 * @param text - The text to convert
 * @returns The text in title case
 */
export const toTitleCase = (text: string): string => {
  if (!text) return text;
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Removes extra whitespace and normalizes spaces
 * @param text - The text to normalize
 * @returns The normalized text
 */
export const normalizeWhitespace = (text: string): string => {
  if (!text) return text;
  return text.replace(/\s+/g, ' ').trim();
}; 