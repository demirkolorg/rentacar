import store from "..";
import { useSelector } from "react-redux";
import { _setLoading } from ".";

export const useLoader = () => useSelector((state) => state.loader.loading);
export const setLoading = (data) => store.dispatch(_setLoading(data));
