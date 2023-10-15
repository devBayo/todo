import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const baseURL = "https://api-todo-9rux.onrender.com/api/v1";

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup(email, password) {
    if (email && password) {
      const bodyData = {
        email,
        password,
      };
      const bodyJSON = JSON.stringify(bodyData);

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${baseURL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyJSON,
        });
        const data = await response.json();

        if (data.status) {
          setError(data.error);
        }

        return data;
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  async function login(email, password) {
    if (email && password) {
      const bodyData = {
        email,
        password,
      };
      const bodyJSON = JSON.stringify(bodyData);

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${baseURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyJSON,
        });

        const data = await response.json();
        if (data.status) {
          return setError(data.error);
        }

        setToken(data.token);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function logout() {
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{ signup, login, token, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
