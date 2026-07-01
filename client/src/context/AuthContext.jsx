import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token,    setToken]    = useState(() => localStorage.getItem('uv_admin_token'));
  const [username, setUsername] = useState(() => localStorage.getItem('uv_admin_user'));

  const login = useCallback((tok, user) => {
    localStorage.setItem('uv_admin_token', tok);
    localStorage.setItem('uv_admin_user',  user);
    setToken(tok);
    setUsername(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('uv_admin_token');
    localStorage.removeItem('uv_admin_user');
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
