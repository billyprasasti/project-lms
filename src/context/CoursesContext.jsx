import { createContext, useContext } from "react";
import useCourseData from "../hooks/useCourseData";

const CoursesContext = createContext(null);

// State management dengan useContext: data kelas dari API dibagikan ke semua halaman
export function CoursesProvider({ children }) {
  const value = useCourseData();
  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
}

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses harus dipakai di dalam <CoursesProvider>");
  return ctx;
}
