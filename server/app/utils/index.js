
export const getPageNum = (total = 0, pageSize = 10, currentPage = 1) => {
  const page = Math.ceil(Number(total) / Number(pageSize)) || 1;
  return {
    total,
    pageSize,
    page,
    current: currentPage
  };
};
