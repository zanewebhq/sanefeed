'use client';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestArgs {
  endpoint: string;
  method?: RequestMethod;
  body?: Record<string, string>;
}

export default async function request({
  endpoint,
  method = 'GET',
  body,
}: RequestArgs) {
  const url = `${baseUrl}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
  };

  return await fetch(url, options);
}
