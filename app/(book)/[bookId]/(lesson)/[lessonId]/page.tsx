import BackButton from '@/components/layout/back-button';
import { ApiResponse, Lesson } from '@/constants';
import { fetchApi } from '@/lib/api';

import LessonContent from './component/lessons';

export default async function LessonPage({ params }: { params: Promise<{ bookId: string; lessonId: string }> }) {
  const { bookId, lessonId } = await params;

  const { data: LessonData }: ApiResponse<Lesson> = await fetchApi(`api/book/${bookId}/${lessonId}`);

  const props = {
    bookId,
    lessonId,
    lessonData: LessonData
  };

  return (
    <main className="container mx-auto">
      <section className="mt-[8vh] mb-3 text-right">
        <BackButton />
      </section>
      <LessonContent {...props} />
    </main>
  );
}
