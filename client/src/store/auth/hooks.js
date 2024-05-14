import { useSelector } from "react-redux";

export const useToken = () => useSelector((state) => state.auth.token);
export const useUser = () => useSelector((state) => state.auth.user);
