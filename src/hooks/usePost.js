import * as axios from 'axios';
import { useEffect, useState } from 'react';

const usePost = (
  initialUrl = { path: null, data: null },
  headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const asyncUseEffect = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const response = await axios.post(url.path, url.data, headers);
        if (response.status === 200 || response.status === 201) {
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

export default usePost;
