// lib/api.ts

import get, { HTTPError, Options } from 'ky';

import { ApiResponse } from '@/types';

// 示例：一个通用的 GET 请求助手函数，使用 ky
export async function fetchApi<T>(url: string, options?: Options): Promise<T> {
  try {
    // 使用 ky.get() 发送 GET 请求，并自动解析 JSON
    const response = await get(url, {
      // prefixUrl: 'https://api.example.com',
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

// 示例：特定 API 调用函数
export async function getUserData(userId: string): Promise<ApiResponse> {
  const url = `https://api.example.com/users/${userId}`;
  return fetchApi<ApiResponse>(url);
}
