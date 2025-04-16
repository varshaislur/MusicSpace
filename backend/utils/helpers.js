/**
 * Generates a random code of specified length
 * Used for creating unique space join codes
 * @param {number} length - The length of the code to generate
 * @returns {string} Random alphanumeric code
 */
export const generateRandomCode = (length) => {
    // Using characters that are less likely to be confused with each other
    // Omitting 0, 1, O, I to avoid confusion
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  };
  
  /**
   * Formats a date to a readable string
   * @param {Date} date - The date to format
   * @returns {string} Formatted date string
   */
  export const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };
  
  /**
   * Validates a YouTube URL
   * @param {string} url - URL to validate
   * @returns {boolean} Whether the URL is a valid YouTube URL
   */
  export const isValidYoutubeUrl = (url) => {
    const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?].*)?$/;
    return pattern.test(url);
  };
  
  /**
   * Truncates text to a specified length and adds ellipsis if needed
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length before truncation
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Sanitizes user input to prevent XSS attacks
   * @param {string} input - String to sanitize
   * @returns {string} Sanitized string
   */
  export const sanitizeInput = (input) => {
    if (!input) return '';
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };
  
  /**
   * Creates a slug from a string
   * @param {string} text - String to convert to slug
   * @returns {string} URL-friendly slug
   */
  export const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .trim();                  // Trim leading/trailing spaces
  };
  
  /**
   * Creates pagination parameters for Prisma queries
   * @param {number} page - Current page number (1-based)
   * @param {number} pageSize - Number of items per page
   * @returns {Object} Prisma pagination parameters (skip & take)
   */
  export const getPaginationParams = (page = 1, pageSize = 10) => {
    const parsedPage = parseInt(page, 10);
    const parsedSize = parseInt(pageSize, 10);
    
    return {
      skip: (parsedPage - 1) * parsedSize,
      take: parsedSize
    };
  };