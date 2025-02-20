// import { createContext, useState } from "react";

// export const AdminAuthContext = createContext();

// export const AdminAuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   const login = (newToken) => {
//     setToken(newToken);
//     localStorage.setItem("token", newToken);
//   };

//   const logout = () => {
//     setToken("");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AdminAuthContext.Provider value={{ token, setToken, login, logout }}>
//       {children}
//     </AdminAuthContext.Provider>
//   );
// };
