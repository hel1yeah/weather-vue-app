import { ref } from 'vue';

const GEO_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 10 * 60 * 1000,
};

export function useGeolocation() {
  const loading = ref(false);
  const error = ref(null);

  const isSupported = () =>
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const getCoords = () =>
    new Promise((resolve, reject) => {
      if (!isSupported()) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        (err) => reject(err),
        GEO_OPTIONS,
      );
    });

  const locate = async () => {
    loading.value = true;
    error.value = null;
    try {
      const coords = await getCoords();
      return `${coords.lat.toFixed(4)},${coords.lon.toFixed(4)}`;
    } catch (e) {
      error.value = e;
      console.error('Geolocation failed:', e);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { locate, loading, error, isSupported };
}
