const API_URL = import.meta.env.PROD 
? 'https://relocation-bridge.onrender.com/api'
: 'http://localhost:5001/api'

export const api = {
  // Get all history
  getComparisons: async () => {
    try {
      const response = await fetch(`${API_URL}/history`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('History data received:', data);
      return data; // Should be an array from your real route
    } catch (error) {
      console.error('Error fetching history:', error);
      return []; // Return empty array on error
    }
  },

  // Save a history
  saveComparison: async (comparison: any) => {
    try {
      const response = await fetch(`${API_URL}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comparison)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Save response:', data);
      return data;
    } catch (error) {
      console.error('Error saving comparison:', error);
      throw error;
    }
  },

  // Clear all history
  clearHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/history`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  }
};