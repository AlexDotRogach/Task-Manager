export const localHost = {
  baseUrl: 'http://localhost:5050/items',
};
// _limit=10&_page=1
export const headersFetch = (type, body) => {
  return  {
    method: type,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
}
