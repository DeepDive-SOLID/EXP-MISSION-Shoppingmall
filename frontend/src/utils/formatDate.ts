export const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const getToday = (): string => new Date().toISOString().split("T")[0];
