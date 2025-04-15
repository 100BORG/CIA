export const getItem = (key) => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    
    if (value.startsWith('{') || value.startsWith('[')) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

export const setItem = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const valueToStore = typeof value === 'object' 
      ? JSON.stringify(value) 
      : value;
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const removeItem = (key) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
