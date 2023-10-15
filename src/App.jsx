import { TodoProvider } from "./contexts/TodoContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/todos" />} />

            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
