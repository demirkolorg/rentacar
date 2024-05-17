import { _logout, _login, _setCurrentUser } from '.';
import store from '..';

export const setCurrentUser = data => store.dispatch(_setCurrentUser(data));
export const setLogin = data => store.dispatch(_login(data));
export const setLogout = () => store.dispatch(_logout());
