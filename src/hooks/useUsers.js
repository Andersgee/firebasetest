import usePromise from "react-fetch-hook/usePromise";
import { fetchusers } from "../firebase";

export default function useUsers() {
  return usePromise(() => fetchusers());
}
