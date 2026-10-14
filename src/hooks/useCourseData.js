import { useCallback, useEffect, useState } from "react";
import * as api from "../services/api/courseService";

// Custom hook: memisahkan logika API dari komponen.
// Mengelola data kelas + status loading/error + aksi GET/ADD/UPDATE/DELETE.
export default function useCourseData() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getCourses(signal);
      if (!signal?.aborted) setCourses(data);
    } catch (e) {
      if (!signal?.aborted) setError(e.message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  // CREATE
  const addCourse = async (data) => {
    const created = await api.createCourse({ ...data, reviews: "0" });
    setCourses((prev) => [created, ...prev]);
    return created;
  };

  // UPDATE
  const updateCourse = async (id, data) => {
    const existing = courses.find((c) => c.id === id);
    const updated = await api.updateCourse(id, { ...existing, ...data });
    setCourses((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  // DELETE
  const deleteCourse = async (id) => {
    await api.deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return { courses, loading, error, reload: () => load(), addCourse, updateCourse, deleteCourse };
}
