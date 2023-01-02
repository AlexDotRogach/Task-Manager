export const localHost = {
  baseUrl: 'http://localhost:3000/items',
};

export const headersFetch = (type, body) => {
  return  {
    method: type,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
}
