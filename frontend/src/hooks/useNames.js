import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useImage = (type) => {
  const { data, error } = useSWR(
    `http://spacedle-env.eba-mcyhkitc.sa-east-1.elasticbeanstalk.com:6789/api/names/${type}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );

  return {
    data: data,
    loading: !error && !data,
    error: error,
  };
};

export default useImage;
