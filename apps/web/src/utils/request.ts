const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestArgs {
  endpoint: string;
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: Record<string, string>;
}

export default async function request({
  endpoint,
  method = 'GET',
  headers,
  body,
}: RequestArgs) {
  const url = `${baseUrl}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
    cache: 'no-store',
  };

  return await fetch(url, options);
}
