import dayjs from "dayjs";

export const convertDate = (dateString: string) => {
  return dayjs(dateString).format("D MMMM, YYYY");
};
