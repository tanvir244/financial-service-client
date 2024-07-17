import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";

const Main = () => {
    return (
        <div className="flex">
            <div className="w-[20%]">
                <Home />
            </div>
            <div className="w-[80%] bg-[#f5ebe0] py-16">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;