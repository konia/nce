import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server'; // 推荐使用 NextResponse 来简化
import path from 'path';

// import { LessonApiParams } from '@/constants';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ bookId: string; lessonId: string }> }
) {
  console.log(11111111);
  const { bookId, lessonId } = await params;
  console.log('🚀 ~ GET ~ lessonId:', lessonId);
  console.log('🚀 ~ GET ~ bookId:', bookId);
  try {
    const filePath = path.join(process.cwd(), 'public', `audio/${bookId}/${lessonId}.lrc`);
    const data = await fs.readFile(filePath, 'utf8');

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON:', error);
    return NextResponse.json({ error: 'Failed to read JSON' }, { status: 500 });
  }
}
