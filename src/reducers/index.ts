import { combineReducers } from "redux";
import location from './location';
import breed from "./breed";
import animal from "./animal";
import theme from "./theme";

export const rootReducer = combineReducers({
  location,
  breed,
  animal,
  theme
});

export type RootState = ReturnType<typeof rootReducer>