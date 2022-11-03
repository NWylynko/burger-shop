
export const JsonResponse = (status: number, obj: object) => {

  console.log(status, obj)

  const headers = {
    "content-type": "application/json"
  };

  const body = JSON.stringify(obj);

  return new Response(body, { headers, status });
};
