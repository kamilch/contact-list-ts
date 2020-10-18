import mockData from "../mockData.json";
import { pageSize } from "../common/constants";

let cursor = -1;

function delay(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}

export const allItemsCount = mockData.length;

export default async function apiData() {
  await delay(1000);
  if (Math.random() > 0.7) {
    throw new Error("Something went wrong");
  }
  cursor += 1;
  const start = cursor * pageSize;
  const end = cursor * pageSize + pageSize;
  return mockData.slice(start, end);
}
