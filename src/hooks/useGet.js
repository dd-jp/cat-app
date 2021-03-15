import * as axios from 'axios';
import { useEffect, useState } from 'react';

const useGet = (initialUrl, options = {}) => {
  const [isLoading, setLoading] = useState(initialUrl);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const asyncUseEffect = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await axios.get(url, options);
        if (response.status === 200) {
          setData({
            headers: response.headers,
            response: response.data,
            status: response.status
          });
        } else {
          throw new Error(response);
        }
      } catch (respError) {
        console.error({ respError });
        setError(respError);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      asyncUseEffect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { isLoading, data, error, setUrl };
};

export default useGet;
