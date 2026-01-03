'use client';

import { useEffect } from 'react';
import { ArrowRightIcon, AudioLinesIcon, BlocksIcon, BookOpenCheckIcon, DownloadIcon, ShapesIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { books, courses } from '@/constants';
import { convertToRomanBasic } from '@/lib/utils';

export default function Home() {
  const router = useRouter();

  const handlePdfDownload = (url: string) => {
    // 1. 创建临时<a>标签（仅在内存中，不显示在页面上）
    const tempLink = document.createElement('a');
    // 2. 设置PDF路径和下载文件名
    tempLink.href = url;
    tempLink.download = url.slice(7); // 可选：自定义下载文件名
    // 3. 触发点击（自动下载）
    tempLink.click();
    // 4. 移除临时标签（清理资源，可选，不影响功能）
    URL.revokeObjectURL(tempLink.href);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem('PlaybackHistory');

    if (hasVisited) {
      setTimeout(() => {
        toast.info(() => <span className="font-semibold">Welcome Back!</span>, {
          id: 'welcome-toast',
          description: `The recent studies was L${decodeURIComponent(JSON.parse(hasVisited).lessonId).split('－')[0]} of Book
              ${JSON.parse(hasVisited).bookId.slice(-1)}. Do you want to continue?`,

          className: 'rounded-xxs! py-3!',
          classNames: {
            description: 'text-xs! text-gray-600!',
            actionButton: 'rounded-xs! bg-gray-900!',
            closeButton: 'bg-white! text-gray-600!'
          },
          duration: Infinity,
          closeButton: true,
          action: {
            label: 'Continue',
            onClick: () => router.push(`/${JSON.parse(hasVisited).bookId}/${JSON.parse(hasVisited).lessonId}`)
          },
          onDismiss: () => {
            localStorage.removeItem('PlaybackHistory');
          }
        });
      }, 0);
    }
  }, [router]);

  return (
    <>
      <section className="mt-14 flex items-center justify-between">
        <section className="relative z-1 max-w-1/2 flex-1">
          <Badge variant="secondary" className="border border-amber-200 bg-amber-100 text-xs text-amber-500">
            Base on the New Concept English
          </Badge>
          <div className="absolute -top-30 -z-1 h-90 w-90 rounded-full border border-dashed border-current text-amber-500 before:absolute before:top-1/2 before:left-1/2 before:h-60 before:w-60 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-dashed before:border-current after:absolute after:top-1/2 after:left-1/2 after:h-120 after:w-120 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-current"></div>
          <h1 className="mt-2 text-6xl font-semibold uppercase">
            up your <span className="mb-2 font-bold text-amber-400"> skills</span>
            <br />
            to <span className="mb-2 font-bold text-amber-400"> promote </span>
            your <span className="mb-2 font-bold text-amber-400"> career </span> development
          </h1>
          <div className="my-6 text-base text-gray-500">
            These courses can help you improve your skills and abilities to better handle your daily work.
            <br />
            Believe in yourself and you will succeed
          </div>
          <section className="flex gap-x-5">
            <Button
              onClick={() => {
                open('https://pan.quark.cn/s/05fa412deb28?pwd=ESLF', '_blank');
              }}
            >
              Let&apos;s Get Started
              <ArrowRightIcon size={16} />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-600">
                  Download Books
                  <DownloadIcon size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-xxs w-82 p-2">
                <div className="grid gap-2">
                  <div className="space-y-2 px-2 pt-2 pb-0">
                    <h4 className="text-sm leading-none font-medium">PDF Book Download</h4>
                    <p className="text-muted-foreground text-xs">Please select the book you want to download.</p>
                  </div>
                  <div className="flex flex-col">
                    {books.map((book, index) => (
                      <div
                        key={book.id}
                        className="rounded-xxs flex cursor-pointer gap-x-3 p-2 hover:bg-amber-50"
                        onClick={() => handlePdfDownload(book.file)}
                      >
                        <Image
                          src={book.image}
                          width={40}
                          height={40}
                          alt={book.title}
                          className="rounded-xxs"
                          loading="eager"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-600">
                            <b className="text-gray-700">Book {index + 1}</b> - {book.title}
                          </span>
                          <Badge
                            className="py-0.2 mt-0.5 px-1 text-[10px]"
                            style={{ backgroundColor: book.color, color: book.text }}
                            variant="secondary"
                          >
                            {book.tag}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-600"
              onClick={() => open('https://github.com/konia/nce', '_blank')}
            >
              GitHub
            </Button>
          </section>
        </section>
        <section className="flex w-180 justify-center">
          <div className="relative w-135">
            <div className="absolute top-12 -left-5 z-1 flex items-center gap-x-3 rounded-lg border border-amber-400 bg-amber-100 px-3.5 py-3 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <BookOpenCheckIcon className="text-white" size={24} />
              </div>
              <div className="text-xs text-gray-500">
                <span className="">Text Segments</span>
                <h4 className="text-lg leading-5 font-semibold text-black">3000+</h4>
              </div>
            </div>
            <div className="absolute -right-30 bottom-30 z-1 flex items-center gap-x-3 rounded-lg border border-amber-400 bg-amber-100 px-3.5 py-3 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <AudioLinesIcon className="text-white" size={24} />
              </div>
              <div className="text-xs text-gray-500">
                <h4 className="text-lg leading-5 font-semibold text-black">200+</h4>
                <span className="">Audio Courses</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-20 -z-1 h-60 w-60 rounded-full border border-dashed border-current text-amber-500 before:absolute before:top-1/2 before:left-1/2 before:h-30 before:w-30 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-dashed before:border-current after:absolute after:top-1/2 after:left-1/2 after:h-90 after:w-90 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-current"></div>
            <div className="before-top-10 absolute -right-5 -bottom-5 h-135 w-135 rounded-full bg-radial from-amber-400 from-40% to-amber-600 before:absolute before:h-8 before:w-8 before:rounded-full before:bg-amber-400 after:absolute after:right-5 after:bottom-20 after:h-4 after:w-4 after:rounded-full after:bg-red-400"></div>
            <div className="absolute top-20 -left-4 -z-1 h-125 w-125 rounded-full border border-dashed border-amber-500"></div>
            <div className="absolute top-1/2 -left-10 h-5 w-5 rounded-full bg-green-500" />
            <div className="absolute top-30 right-20 h-3 w-3 rounded-full bg-pink-600" />
            <div className="absolute top-1/2 -right-10 h-3 w-3 rounded-full bg-blue-600" />
            <BlocksIcon size={32} className="absolute top-10 right-20 rotate-15 text-amber-500" />
            <ShapesIcon size={32} className="absolute bottom-10 left-5 rotate-90 text-indigo-500" />

            <Image
              src={'/images/child.png'}
              width={600}
              height={759}
              loading="eager"
              className="mask-b-from-black mask-b-from-75% mask-b-to-transparent mask-alpha"
              alt={'Here is a Child'}
            />
          </div>
        </section>
      </section>
      <section className="my-30">
        <h1 className="mb-10 text-center text-6xl font-semibold">
          A Simple and Smart Way <br />
          to Learn English
        </h1>
        <section className="flex gap-x-10">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group flex-1 rounded-sm border-0 p-0 transition-all duration-300 ease-in-out hover:-translate-y-4 hover:cursor-pointer hover:shadow-xl"
              onClick={() => router.push(`/${course.id}`)}
            >
              <CardContent className="p-0">
                <section
                  className="relative aspect-square w-full overflow-hidden rounded-sm"
                  style={{ backgroundColor: course.color }}
                >
                  <div className="absolute top-3 left-3 z-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-amber-300 text-amber-700">
                    {convertToRomanBasic(Number(course.id.slice(-1)))}
                  </div>
                  <Badge className="absolute right-4 bottom-4 z-1 border-2 border-white/40 text-xs">
                    {course.lessons}
                  </Badge>
                  <Image
                    src={course.background}
                    width={640}
                    height={640}
                    className="opacity-10 mix-blend-multiply"
                    alt={course.background}
                  />
                  <section className="absolute top-2 aspect-square w-160 xl:-left-1/4 2xl:-left-1/6">
                    <Image src={course.image} width={640} height={640} className="w-full" alt={course.title} />
                  </section>
                </section>
                <p className="mt-5 flex items-center justify-between gap-x-2 px-5 text-lg font-semibold">
                  {course.title}
                </p>
                <p className="mt-1 px-5 text-sm text-gray-500">{course.description}</p>
              </CardContent>
              <CardFooter className="mt-auto pb-6">
                <Button className="group-hover:bg-primary/90 group-hover:text-primary-foreground ease-in-out- relative w-full bg-gray-600 text-white transition-all duration-300 hover:cursor-pointer">
                  <span className="opacity-100 transition-all duration-300 ease-in-out group-hover:opacity-0">
                    Try to Learn This Lesson
                  </span>
                  <span className="absolute opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                    Listen Audio
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </section>
    </>
  );
}
