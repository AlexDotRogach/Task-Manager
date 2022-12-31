import { localHost } from './const';

const fetchData = async (searchQuery, headers = {}) => {
  const { baseUrl} = localHost;
  const request = await fetch(
    `${baseUrl}`, headers
  );

  return request.ok ? await request.json() : 'no request';
};

export default fetchData;
