import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";

import Root from "./components/Root/Root";
import Home from "./components/Home/Home";

import Login from "../src/components/Login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePosts from "./components/CreateProfile/ProfilePosts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePosts />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/chat" element={<Chat />} /> */}

        {/* <Route
          path="/chat"
          element={
            <ProtectedRoute>

            <Chat />

            </ProtectedRoute>
          }
        /> */}

        <Route path="/login" element={<Login />} />
      </Route>
    </>
  )
);

function App() {
  // const isLogin = useSelector((state) => state.auth.access_token);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("this is app jsx", isLogin);
  // }, [isLogin]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
