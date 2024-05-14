import store from "../../index";
import { useSelector } from "react-redux";
import { _setAddSubeModalState,_setEditSubeModalState, _setDeleteSubeModalState,_setStatusSubeModalState, _setSubeler, _setSube, _fetchSubeler } from ".";

export const fetchSubeler = (params) => store.dispatch( _fetchSubeler(params));

export const useSubeler = () => useSelector((state) => state.sube.subeler);
export const setSubeler = (data) => store.dispatch(_setSubeler(data));

export const useSube = () => useSelector((state) => state.sube.sube);
export const setSube = (data) => store.dispatch(_setSube(data));

export const useAddSubeModalState = () => useSelector((state) => state.sube.addSubeModalState);
export const setAddSubeModalState = (data) => store.dispatch(_setAddSubeModalState(data));

export const useEditSubeModalState = () => useSelector((state) => state.sube.editSubeModalState);
export const setEditSubeModalState = (data) => store.dispatch(_setEditSubeModalState(data));

export const useDeleteSubeModalState = () => useSelector((state) => state.sube.deleteSubeModalState);
export const setDeleteSubeModalState = (data) => store.dispatch(_setDeleteSubeModalState(data));

export const useStatusSubeModalState = () => useSelector((state) => state.sube.statusSubeModalState);
export const setStatusSubeModalState = (data) => store.dispatch(_setStatusSubeModalState(data));
