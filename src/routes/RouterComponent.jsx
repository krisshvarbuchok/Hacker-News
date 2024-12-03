import { Route, Routes } from "react-router-dom";
import OpenNew from "../pages/OpenNew";
import HomePage from "../pages/HomePage";

const RouterComponent = () =>{

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/openNew" element={<OpenNew />}/>
        </Routes>
    )
}
export default RouterComponent;