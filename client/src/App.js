//Packages import
import React, {useState, useEffect} from 'react';
import {useLocation, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useValidContext } from './hooks/useValidContext';
import { useAdminContext } from './hooks/useAdminContext';


//Pages import
import Home from './pages/Home';
import Login from './pages/Login';
import AccAuth from './pages/AccAuth';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Tools from './pages/Tools';
import Autocopy from './pages/Autocopy';
import Changepass from './pages/Changepass';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import WhatsappAuth from './pages/WhatsappAuth';

//Mgen
import Mgen from './pages/mgen/Mgen';
import Mgenform from './pages/mgen/Mgenform';
import MgenCreateForm from './pages/mgen/MgenCreateForm';
import MgenSForm from './pages/mgen/MgenSForm';
import MgenContacts from './pages/mgen/MgenContacts';

//Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import AdminWsAuth from './pages/admin/AdminWsAuth';
import AdminUserList from './pages/admin/AdminUserList';
import AdminEditUser from './pages/admin/AdminEditUser';

//Msmart
import Msmart from './pages/msmart/Msmart';
import ManageLeads from './pages/msmart/ManageLeads';
import CreateLead from './pages/msmart/CreateLead';
import CreateTeam from './pages/msmart/manage/CreateTeam';
import ManageTeam from './pages/msmart/manage/ManageTeam';
import SingeLeads from './pages/msmart/SingeLeads';



function App() {

  const { user } = useAuthContext();
  const { valid } = useValidContext();
  const { admin } = useAdminContext();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  

  return (
    <div className='app-content'>
      {showNav ? <Navbar /> : null}
        <Routes>

          <Route path='/mgen/:session_client' element={<Mgenform title=":session_client" setNavbar={setShowNav} />} />
          
          <Route path='*' element={<NotFound setNavbar={setShowNav} />} />

          <Route path='/login' element={user ? <Navigate to="/" state={{from: location}} replace /> : <Login/>  } />

          <Route path='/signup' element={user ? <Navigate to="/" state={{from: location}} replace /> : <Signup/> } />

          <Route path='/auth' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && valid ? <Navigate to="/" state={{from: location}} replace /> : user && !valid && <AccAuth/> } />

          <Route path='/' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Home />}/>

          <Route path='/courses' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Courses />} />

          <Route path='/tools' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Tools />} />

          <Route path='/whatsapp/auth' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <WhatsappAuth />} />

          <Route path='/mgenform' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Mgen />} />

          <Route path='/mgenform/contacts' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <MgenContacts />} />

          <Route path='/mgenform/createform' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <MgenCreateForm />} />

          <Route path='/mgenform/form/:session_client' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <MgenSForm />} />

          <Route path='/msmart' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Msmart />} />

          <Route path='/msmart/db/create' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <CreateLead />} />

          <Route path='/msmart/db/manage' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <ManageLeads />} />
          
          <Route path='/msmart/db/manage/:id' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <SingeLeads />} />

          <Route path='/msmart/team/create' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <CreateTeam />} />

          <Route path='/msmart/team/manage' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <ManageTeam />} />

          <Route path='/mace' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Autocopy />} />

          <Route path='/change-password' element={!user ? <Navigate to="/login" state={{from: location}} replace /> : user && !valid ? <Navigate to="/auth" state={{from: location}} replace /> : user && valid && <Changepass />} />

          <Route path='/admin/login' element={admin ? <Navigate to="/admin/" state={{from: location}} replace /> : <AdminLogin setNavbar={setShowNav} />} />

          <Route path='/admin/' element={!admin ? <Navigate to="/admin/login" state={{from: location}} replace /> : <AdminPanel setNavbar={setShowNav} />}  />

          <Route path='/admin/wsauth' element={!admin ? <Navigate to="/admin/login" state={{from: location}} replace /> : <AdminWsAuth setNavbar={setShowNav} />} />
          
          <Route path='/admin/users' element={!admin ? <Navigate to="/admin/login" state={{from: location}} replace /> : <AdminUserList setNavbar={setShowNav} />} />

          <Route path='/admin/users/edit/:user' element={!admin ? <Navigate to="/admin/login" state={{from: location}} replace /> : <AdminEditUser setNavbar={setShowNav} />} />

        </Routes>
      
        </div>
      
  );
}

export default App;
