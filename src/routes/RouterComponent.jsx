import { Route, Routes } from "react-router-dom";
import OpenNew from "../components/OpenNew/OpenNew";
import HomePage from "../components/HomePage/HomePage";

const RouterComponent = () =>{

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="openNew" element={<OpenNew />}/>
        </Routes>
    )
}
export default RouterComponent;