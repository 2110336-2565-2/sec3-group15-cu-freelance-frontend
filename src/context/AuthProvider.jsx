import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
