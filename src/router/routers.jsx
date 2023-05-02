import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../screens/Home/Home";
import EmployeeList from "../screens/EmployeeList/EmployeeList";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home/>} />
                <Route path='employeeList' element={<EmployeeList/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;