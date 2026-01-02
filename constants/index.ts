import { Course } from './types';

export * from './types';

export const TIME_REG = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export const INFO_REG = {
  album: /\[al:(.*)\]/,
  artist: /\[ar:(.*)\]/,
  title: /\[ti:(.*)\]/
};
export const courses: Course[] = [
  {
    id: 'nce-1',
    title: 'First Things First',
    image: '/images/nce1.png',
    description:
      'Able to handle simple daily communication and master the core grammatical framework of elementary English.',
    color: 'oklch(86.5% 0.127 207.078) ',
    background: '/images/bg1.jpg',
    lessons: '144 lessons'
  },
  {
    id: 'nce-2',
    title: 'Practice Progress',
    image: '/images/nce2.png',
    description: 'Able to read articles of moderate difficulty, write well-organized articles, and handle basic exams.',
    color: 'oklch(79.2% 0.209 151.711)',
    background: '/images/bg2.jpg',
    lessons: '96 lessons'
  },
  {
    id: 'nce-3',
    title: 'Developing Skills',
    image: '/images/nce3.png',
    description:
      'Able to read simplified original texts/news, write well-structured argumentative essays, and pass important exams.',
    color: 'oklch(71.2% 0.194 13.428)',
    background: '/images/bg3.jpg',
    lessons: '60 lessons'
  },
  {
    id: 'nce-4',
    title: 'Fluency In English',
    image: '/images/nce4.png',
    description: 'Able to read academic works and write professional papers to meet work requirements.',
    color: 'oklch(90.5% 0.182 98.111)',
    background: '/images/bg4.jpg',
    lessons: '48 lessons'
  }
];
