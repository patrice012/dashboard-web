// post request helpers boiler plate
// env
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const postReq = async ({
  data,
  url,
}: {
  data: unknown;
  url: string;
}): Promise<Response> => {
  // headers
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  // fetch
  const endpoint = `${API_ENDPOINT}${url}`;

  try {
    const req = await fetch(endpoint, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    return req;
  } catch (error) {
    const err = error as Error;
    console.error("Error:", error);
    throw err;
  }
};

export default postReq;
