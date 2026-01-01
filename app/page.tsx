'use client';

import { ArrowRightIcon, AudioLinesIcon, BlocksIcon, BookOpenCheckIcon, ShapesIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { courses } from '@/constants';
import { convertToRomanBasic } from '@/lib/utils';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <section className="mt-14 flex items-center justify-center gap-x-10">
        <section className="relative">
          <Badge variant="secondary" className="border border-amber-200 bg-amber-100 text-xs text-amber-500">
            Base on the New Concept English
          </Badge>
          <div className="absolute -top-30 -z-1 h-90 w-90 rounded-full border border-dashed border-current text-amber-500 before:absolute before:top-1/2 before:left-1/2 before:h-60 before:w-60 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:border-dashed before:border-current after:absolute after:top-1/2 after:left-1/2 after:h-120 after:w-120 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-dashed after:border-current"></div>
          <h1 className="mt-2 text-7xl font-semibold uppercase">
            <span className="mb-2 font-bold text-amber-400"></span>
            up your <span className="mb-2 font-bold text-amber-400"> skills </span> <br />
            to <span className="mb-2 font-bold text-amber-400"> advance</span> your <br />
            <span className="mb-2 font-bold text-amber-400">career</span> path
          </h1>
          <div className="my-6 text-base text-gray-500">
            These courses can help you improve your skills and abilities to better handle your daily work.
            <br />
            Believe in yourself and you will succeed
          </div>
          <section className="flex gap-x-5">
            <Button onClick={() => {}}>
              Let&apos;s Get Started
              <ArrowRightIcon size={16} />
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-800 text-white hover:bg-gray-600"
              onClick={() => router.push('https://github.com/konia/NCE')}
            >
              GitHub
            </Button>
          </section>
        </section>
        <section className="flex flex-1 justify-center">
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
              width={1239}
              height={1567}
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
                  <section className="absolute top-2 -left-12 aspect-square w-160">
                    <Image src={course.image} width={640} height={640} className="w-full" alt={course.title} />
                  </section>
                </section>
                <p className="mt-5 flex items-center justify-between gap-x-2 px-5 text-lg font-semibold">
                  {course.title}
                </p>
                <p className="mt-1 px-5 text-sm text-gray-500">{course.description}</p>
              </CardContent>
              <CardFooter className="pb-6">
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
