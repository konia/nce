import { ApiResponse, BookCatalog, Lesson } from '@/constants';
import { fetchApi } from '@/lib/api';

import LessonContent from './component/lessons';

export default async function LessonPage({ params }: { params: Promise<{ bookId: string; lessonId: string }> }) {
  const { bookId, lessonId } = await params;

  const [{ data: bookData }, { data: lessonData }] = await Promise.all([
    fetchApi<ApiResponse<BookCatalog[]>>(`api/book/${bookId}`),
    fetchApi<ApiResponse<Lesson>>(`api/book/${bookId}/${lessonId}`)
  ]);

  const navigation = bookData
    .map((item, index) => {
      if (item.filename === decodeURIComponent(lessonId)) {
        return {
          ...item,
          pre: index > 0 ? bookData[index - 1].filename : null,
          next: index < bookData.length - 1 ? bookData[index + 1].filename : null
        };
      }
    })
    .filter(Boolean)[0];
  const props = {
    bookId,
    lessonId,
    lessonData: { ...lessonData, ...navigation }
  };

  return (
    <main className="container mx-auto">
      <LessonContent {...props} />
    </main>
  );
}
