import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  try {
    const filePath = path.join(process.cwd(), 'public', 'data/data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const id = bookId.slice(-1);
    const data = JSON.parse(fileContents)[id];

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON:', error);
    return NextResponse.json({ error: 'Failed to read JSON' }, { status: 500 });
  }
}
