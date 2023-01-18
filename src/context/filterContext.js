import { createContext, useContext } from "react";

export const filterContext = createContext(function(){});

// Імпортуємо та використовуємо цей хук у компонентах
export const useFilter = () => useContext(filterContext);
