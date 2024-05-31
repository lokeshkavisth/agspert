import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Failed to remove user data from localStorage:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
