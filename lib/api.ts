import get, { HTTPError, Options } from 'ky';

export async function fetchApi<T>(url: string, options?: Options): Promise<T> {
  try {
    // 使用 ky.get() 发送 GET 请求，并自动解析 JSON
    const response = await get(url, {
      prefixUrl: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json'
        // 可以添加认证：'Authorization': `Bearer ${token}`,
      },
      retry: 3,
      ...options // 允许传入额外选项，如 searchParams、retry 等
    }).json<T>();

    return response;
  } catch (error) {
    // ky 会抛出 KyError，包括 status 和 response
    if (error instanceof HTTPError) {
      console.error(`HTTP error! Status: ${error.response.status}`);
      // 可以进一步处理错误响应：await error.response.json()
    } else {
      console.error('API fetch error:', error);
    }
    throw error; // 重新抛出以便调用方处理
  }
}
