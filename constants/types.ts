export type ApiResponse = {
  data: string;
  status: string;
  message: string;
};

export type BookCatalog = {
  title: string;
  filename: string;
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
