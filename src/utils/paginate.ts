export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number
): { paginatedItems: T[]; totalPages: number } {
  if (!items) {
    return { paginatedItems: [], totalPages: 0 };
  }
  const totalPages = Math.ceil(items.length / pageSize); //get all num of pages
  if (currentPage < 1 || currentPage > totalPages) {
    return { paginatedItems: [], totalPages };
  }
  const start = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return { paginatedItems, totalPages };
}
