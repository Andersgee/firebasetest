import usePromise from "react-fetch-hook/usePromise";
import { fetchallusers } from "../firebase";

export default function useAllusers() {
  return usePromise(() => fetchallusers());
}
