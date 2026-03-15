import React from 'react';
import Navbar from './Components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './Components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './Components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './conext/AppContext';
import AdminLayout from './pages/admin/Layout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import OwnerRequests from './pages/admin/OwnerRequests';
import Hotels from './pages/admin/Hotels';
import Rooms from './pages/admin/Rooms';
import Loader from './Components/Loader';
import SimplePage from "./pages/SimplePage";

const App = () => {
  const pathname = useLocation().pathname;
  const isDashboardPath =
    pathname.includes('/owner') || pathname.includes('/admin');

  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isDashboardPath && <Navbar />}
      {showHotelReg && <HotelReg />}

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/loader/:nextUrl' element={<Loader />} />

          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='owner-requests' element={<OwnerRequests />} />
            <Route path='hotels' element={<Hotels />} />
            <Route path='rooms' element={<Rooms />} />
            
          </Route>
          <Route path='/:page' element={<SimplePage />} />
        </Routes>

      </div>

      {!isDashboardPath && <Footer />}
    </div>
  );
};

export default App;