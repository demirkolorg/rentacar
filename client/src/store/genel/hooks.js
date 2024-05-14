import store from "..";
import { useSelector } from "react-redux";
import { _setOnayModalState,_setOnayDurumu,_setOnayFonksiyonu } from ".";

export const useOnayModalState = () => useSelector((state) => state.genel.onayModalState);
export const setOnayModalState = (data) => store.dispatch(_setOnayModalState(data));

export const useOnayDurumu = () => useSelector((state) => state.genel.onayDurumu);
export const setOnayDurumu = (data) => store.dispatch(_setOnayDurumu(data));

export const setOnayFonksiyonu = (data) => store.dispatch(_setOnayFonksiyonu(data));
export const useOnayFonksiyonu = () => useSelector((state) => state.genel.onayFonksiyonu);
