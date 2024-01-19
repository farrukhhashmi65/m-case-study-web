import { createBrowserRouter } from "react-router-dom";
import Login from "../features/login";
import Dashboard from "../features/dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default router;