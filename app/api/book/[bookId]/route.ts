import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server'; // 推荐使用 NextResponse 来简化
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {
  const { bookId } = await params;
  console.log('🚀 ~ GET ~ params:11111', await params);
  try {
    // 构建 public/data.json 的绝对路径
    const filePath = path.join(process.cwd(), 'public', 'data/data.json');
    console.log('🚀 ~ GET ~ filePath:', filePath);

    // 读取文件内容
    const fileContents = await fs.readFile(filePath, 'utf8');

    // 解析 JSON
    const id = bookId.slice(-1);
    console.log('🚀 ~ GET ~ id:', id);
    const data = JSON.parse(fileContents)[bookId.slice(-1)];

    // 返回 JSON 响应
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON:', error);
    return NextResponse.json({ error: 'Failed to read JSON' }, { status: 500 });
  }
}
