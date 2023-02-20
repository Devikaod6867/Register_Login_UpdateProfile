import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home'
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import EmailVefication from './Pages/EmailVerfication/EmailVerification'
import UpdateProfile from "./Pages/UpdateProfile/updateProfile";
import { provider } from "./firebase";
import { Provider } from "react-redux";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/emailVerify",
      element: <EmailVefication/>,
    },
    {
      path: "/updateProfile",
      element: <UpdateProfile/>,
    },
  ]);
  return (
    // <Provider>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    // </Provider> 
  );
}

export default App;
