import client from "./client";

// MockAPI menyimpan id sebagai string; aplikasi memakai angka.
const normalize = (c) => ({
  ...c,
  id: Number(c.id),
  price: Number(c.price),
  duration: Number(c.duration),
  rating: Number(c.rating),
});

// id dibuat oleh server, jadi tidak ikut dikirim di body.
const toPayload = ({ id, createdAt, ...rest }) => rest;

// GET  /courses  -> daftar kelas (terbaru di atas)
export const getCourses = async (signal) => {
  const { data } = await client.get("/courses", { signal });
  return data.map(normalize).sort((a, b) => b.id - a.id);
};

// GET  /courses/:id
export const getCourse = async (id) => {
  const { data } = await client.get(`/courses/${id}`);
  return normalize(data);
};

// POST /courses
export const createCourse = async (payload) => {
  const { data } = await client.post("/courses", toPayload(payload));
  return normalize(data);
};

// PUT  /courses/:id
export const updateCourse = async (id, payload) => {
  const { data } = await client.put(`/courses/${id}`, toPayload(payload));
  return normalize(data);
};

// DELETE /courses/:id
export const deleteCourse = async (id) => {
  await client.delete(`/courses/${id}`);
  return id;
};
