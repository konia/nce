import Image from 'next/image';
import Link from 'next/link';

import BackButton from '@/components/layout/back-button';
import MoveButton from '@/components/layout/move-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type BookCatalog, type Course, courses } from '@/constants';
import { fetchApi } from '@/lib/api';

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const bookData: BookCatalog[] = await fetchApi(`api/book/${bookId}`);

  const cover: Course = courses.filter((course) => course.id == bookId)[0];
  const currentIndex = Number(bookId.slice(-1));
  return (
    <main className="container mx-auto">
      <section className="mt-[8vh] mb-3 text-right">
        <BackButton />
      </section>
      <section className="mb-[10vh] flex h-[70vh] rounded-2xl bg-white">
        <section
          className="relative aspect-square w-full max-w-150 overflow-hidden rounded-sm"
          style={{ backgroundColor: cover.color }}
        >
          <Image
            src={cover.background}
            width={1280}
            height={1280}
            className="opacity-10 mix-blend-multiply"
            alt={cover.background}
          />
          <Image
            src={cover.background}
            width={1280}
            height={1280}
            className="opacity-10 mix-blend-multiply"
            alt={cover.background}
          />
          <section className="absolute top-10 -left-30 aspect-square w-7xl">
            <Image src={cover.image} width={1280} height={1280} className="" alt={cover.title} />
          </section>
        </section>
        <section className="flex-1">
          <h1 className="mt-15 mb-8 flex items-center justify-center gap-x-6 text-center text-5xl">
            <MoveButton type="forward" disabled={currentIndex == 1} index={currentIndex - 1} />
            Book {currentIndex} - {cover.title}
            <MoveButton type="backward" disabled={currentIndex == 4} index={currentIndex + 1} />
          </h1>

          <ScrollArea className="h-[calc(100%-175px)]">
            <section className="mx-10 grid h-[calc(100%-150px)] grid-cols-3 gap-5 pt-2 pb-1">
              {bookData.map((book) => {
                const [lesson, title] = book.filename.split('－');
                return (
                  <Link key={book.title} href={`/${bookId}/${book.filename}`}>
                    <Card className="gap-y-1 rounded-xs border border-amber-100 bg-linear-0 from-amber-100 to-amber-400 p-0.5 shadow-none transition-all duration-300 ease-in-out hover:-translate-y-1 hover:cursor-pointer hover:border-amber-400 hover:shadow-md">
                      <CardContent className="rounded-xxs flex h-14 items-center justify-center gap-x-4 border border-amber-400/50 bg-white/95 px-2 text-center text-sm font-semibold wrap-anywhere break-keep text-gray-700">
                        {title}
                      </CardContent>
                      <CardFooter className="items-center justify-center">
                        <span className="text-[11px] text-amber-800">L {lesson}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </section>
          </ScrollArea>
        </section>
      </section>
    </main>
  );
}
