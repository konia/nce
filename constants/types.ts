export type ApiResponse<T> = {
  data: T;
  status: string;
  message: string;
};

export type LessonApiParams = {
  bookId: string;
  lessonId: string;
};

export type BookCatalog = {
  title: string;
  filename: string;
};

export type Lesson = {
  album: string;
  artist: string;
  title: string;
  pre: string | null;
  next: string | null;
  data: AudioSegment[];
};

export type AudioSegment = {
  startTime: number;
  endTime: number;
  en: string;
  cn: string;
};

export type Course = {
  id: string;
  title: string;
  image: string;
  description: string;
  color: string;
  background: string;
  lessons: string;
};
