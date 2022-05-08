import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Home from "./screens/Home";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import AddEditBlog from "./screens/AddEditBlog/AddEditBlog";
import NotFound from "./screens/NotFound/NotFound";
import PrivateRoute from "./Route/PrivateRoute";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addBlog"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/editBlog/:id"
            element={
              <PrivateRoute>
                <AddEditBlog />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
