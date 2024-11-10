import { Route, Routes } from "react-router-dom";
import OpenNew from "../components/pages/OpenNew/OpenNew";
import HomePage from "../components/pages/HomePage/HomePage";

const RouterComponent = () =>{

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="openNew" element={<OpenNew />}/>
        </Routes>
    )
}
export default RouterComponent;