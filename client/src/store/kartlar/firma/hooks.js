import store from "../../index";
import { useSelector } from "react-redux";
import { _setAddFirmaModalState,_setEditFirmaModalState, _setDeleteFirmaModalState,_setStatusFirmaModalState, _setFirmalar, _setFirma, _fetchFirmalar } from ".";

export const fetchFirmalar = (params) => store.dispatch(_fetchFirmalar(params));

export const setFirma = (data) => store.dispatch(_setFirma(data));
export const useFirma = () => useSelector((state) => state.firma.firma);

export const setFirmalar = (data) => store.dispatch(_setFirmalar(data));
export const useFirmalar = () => useSelector((state) => state.firma.firmalar);

export const setAddFirmaModalState = (data) => store.dispatch(_setAddFirmaModalState(data));
export const useAddFirmaModalState = () => useSelector((state) => state.firma.addFirmaModalState);

export const setEditFirmaModalState = (data) => store.dispatch(_setEditFirmaModalState(data));
export const useEditFirmaModalState = () => useSelector((state) => state.firma.editFirmaModalState);

export const setDeleteFirmaModalState = (data) => store.dispatch(_setDeleteFirmaModalState(data));
export const useDeleteFirmaModalState = () => useSelector((state) => state.firma.deleteFirmaModalState);

export const setStatusFirmaModalState = (data) => store.dispatch(_setStatusFirmaModalState(data));
export const useStatusFirmaModalState = () => useSelector((state) => state.firma.statusFirmaModalState);