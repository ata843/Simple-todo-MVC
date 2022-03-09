interface Task {
  _id: null;
  description: string;
  done: boolean;
  updatedAt: Date;
  createdAt: Date;
}

interface Metadata {
  hasNextPage: boolean,
  hasPrevPage: boolean,
  itemCount: number,
  limit: number,
  nextPage: null,
  offset: number,
  page: number,
  pageCount: number,
  prevPage: null
}

interface Tasks {
  data: {
    items: Task[],
    meta: Metadata,
  }
}

export { Task, Tasks, Metadata };
