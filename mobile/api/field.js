import client from "./client";

export async function getField() {
  const res = await client.get('/field');
  return res.data.fieldList;
}