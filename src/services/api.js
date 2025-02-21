export const callGetApi = async ({ fullUrl }) => {
  const request = await fetch(fullUrl, {
    method: "GET",
    redirect: "follow",
  });
  return request;
};

export const callPostApi = async ({ fullUrl, payload }) => {
  const request = await fetch(fullUrl, {
    method: "POST",
    redirect: "follow",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });

  return request;
};

export const callPutApi = async ({ fullUrl, payload }) => {
  const request = await fetch(fullUrl, {
    method: "PUT",
    redirect: "follow",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });

  return request;
};
