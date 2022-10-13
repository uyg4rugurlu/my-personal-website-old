import dayjs from "dayjs";

export const convertDate = (dateString: string) => {
  const date = dayjs(dateString).format("D MMMM, YYYY");
  return date;
};
