import store from '..';
import { useSelector } from 'react-redux';
import { _setAktifSube } from '.';

export const useAktifSube = () => useSelector(state => state.genel.aktifSube);
export const setAktifSube = data => store.dispatch(_setAktifSube(data));
