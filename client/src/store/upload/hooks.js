import store from "..";
import { useSelector } from "react-redux";
import { _imageUpload } from ".";

export const imageUpload = (data) => store.dispatch(_imageUpload(data));