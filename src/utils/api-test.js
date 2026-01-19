// Simple utility to test API connectivity
import { API_BASE_URL, RAG_API_BASE_URL } from '../constants/api';

/**
 * Test function to verify API connectivity
 */
export const testApiConnection = async (baseUrl = API_BASE_URL) => {
  try {
    // Attempt a simple GET request to test connectivity
    console.log(`Testing API connection to: ${baseUrl}`);

    // Try to make a simple request to see if the backend is reachable
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API connection successful:', data);
      return { success: true, data };
    } else {
      console.log(`API connection failed with status: ${response.status}`);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('API connection error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Test RAG API connectivity specifically
 */
export const testRagApiConnection = async () => {
  return testApiConnection(RAG_API_BASE_URL);
};

/**
 * Get current API configuration for debugging
 */
export const getApiConfig = () => {
  return {
    apiBaseUrl: API_BASE_URL,
    ragApiBaseUrl: RAG_API_BASE_URL,
    isDevelopment: typeof window !== 'undefined' && window.location.hostname === 'localhost',
    environment: process.env.NODE_ENV || 'unknown'
  };
};