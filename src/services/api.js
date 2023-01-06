import { localHost } from './const';

const fetchData = async (headers = {}, ...arg) => {
  const { baseUrl} = localHost;

  const request = await fetch(
    `${baseUrl}${arg}`, headers
  );

  return request.ok ? await request.json() : 'no request';
};

export default fetchData;
