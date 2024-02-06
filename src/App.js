import {Routes, Route} from 'react-router-dom';
import Layout from './component/Layout';
import Home from './Pages/Home'
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import DevInProgress from './component/DevInProgress';
import PersistLogin from './component/PersistLogin';
import About from './Pages/About';
import Services from './Pages/Services';
import Contacts from './Pages/Contacts';

function App(){
    return (
        <Routes>
            <Route element={<PersistLogin/>}>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="auth">
                        <Route index element={<Login/>}/>
                        <Route path="signup" element={<Register/>}/>
                    </Route>
                
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/dev" element={<DevInProgress/>}/>                
                </Route>
            </Route>
        </Routes>
    )
}
export default App;