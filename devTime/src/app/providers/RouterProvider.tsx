
import HomePage from "@/pages/home/ui/HomePage";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";

const router = createBrowserRouter([
    {path:"/", element:<HomePage/>}
])

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}