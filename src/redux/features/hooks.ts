import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./tabsSlice";
import { AuthDispatch, AuthState } from "./authSlice";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAuthDispatch = () => useDispatch<AuthDispatch>();
export const useAuthSelector: TypedUseSelectorHook<AuthState> = useSelector;
