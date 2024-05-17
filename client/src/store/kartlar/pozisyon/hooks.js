import store from '../../index';
import { useSelector } from 'react-redux';
import {
  _setAddPozisyonModalState,
  _setEditPozisyonModalState,
  _setDeletePozisyonModalState,
  _setStatusPozisyonModalState,
  _setPozisyonlar,
  _setPozisyon,
  _fetchPozisyonlar
} from '.';

export const fetchPozisyonlar = params => store.dispatch(_fetchPozisyonlar(params));

export const usePozisyonlar = () => useSelector(state => state.pozisyon.pozisyonlar);
export const setPozisyonlar = data => store.dispatch(_setPozisyonlar(data));

export const usePozisyon = () => useSelector(state => state.pozisyon.pozisyon);
export const setPozisyon = data => store.dispatch(_setPozisyon(data));

export const useAddPozisyonModalState = () => useSelector(state => state.pozisyon.addPozisyonModalState);
export const setAddPozisyonModalState = data => store.dispatch(_setAddPozisyonModalState(data));

export const useEditPozisyonModalState = () => useSelector(state => state.pozisyon.editPozisyonModalState);
export const setEditPozisyonModalState = data => store.dispatch(_setEditPozisyonModalState(data));

export const useDeletePozisyonModalState = () => useSelector(state => state.pozisyon.deletePozisyonModalState);
export const setDeletePozisyonModalState = data => store.dispatch(_setDeletePozisyonModalState(data));

export const useStatusPozisyonModalState = () => useSelector(state => state.pozisyon.statusPozisyonModalState);
export const setStatusPozisyonModalState = data => store.dispatch(_setStatusPozisyonModalState(data));
