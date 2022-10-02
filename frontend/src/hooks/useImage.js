import { useState, useEffect } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useImage = (id, type) => {
  const [ID, setID] = useState(id ?? 0);
  const { data, error } = useSWR(
    `http://spacedle-env.eba-mcyhkitc.sa-east-1.elasticbeanstalk.com:6789/api/continue/${ID}/${type}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    setID(Math.min(id ?? 0, 4));
  }, [id]);

  return {
    data: data,
    loading: !error && !data,
    error: error,
  };
};

export default useImage;
