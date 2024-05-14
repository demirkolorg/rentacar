import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import genel from "./genel";
import layout from "./layout";
import loader from "./loader";
import firma from "./kartlar/firma";
import sube from "./kartlar/sube";
import pozisyon from "./kartlar/pozisyon";

const store = configureStore({
  reducer: {
    genel,
    layout,
    auth,
    loader,
    firma,
    sube,
    pozisyon,
  },
});

export default store;
