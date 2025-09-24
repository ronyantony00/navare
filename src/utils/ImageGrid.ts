export const getColSpanClass = (index: number) => {
  const pattern = [1, 2, 2, 1];
  const spanValue = pattern[index % 4];
  return spanValue === 1 ? 'col-span-1' : 'col-span-2';
};
