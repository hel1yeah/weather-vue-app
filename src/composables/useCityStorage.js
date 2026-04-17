const STORAGE_KEY = 'city';

export function useCityStorage() {
  const getCity = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  };

  const setCity = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* noop */
    }
  };

  return { getCity, setCity };
}
