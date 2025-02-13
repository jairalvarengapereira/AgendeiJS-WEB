import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import Doctors from "./pages/doctors/doctors.jsx";
import DoctorsAdd from "./pages/doctors-add/doctors-add.jsx";
import Users from "./pages/users/users.jsx";
import UsersAdd from "./pages/users-add/users-add.jsx";

function Rotas() {
  return (
    <BrowserRouter>
    {/* URIs */}
      <Routes> 
        <Route path="/" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Appointments (Agendamentos) */}
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/add" element={<AppointmentAdd />} />
        <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />

        {/* Doctors (Médicos) */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/add" element={<DoctorsAdd />} />
        <Route path="/doctors/edit/:id_doctor" element={<DoctorsAdd />} /> {/* Adicionei essa linha */}

        {/* Users (Pacientes) */}
        <Route path="/users/" element={<Users />} />
        <Route path="/users/add" element={<UsersAdd />} />
        <Route path="/users/edit/:id_user" element={<UsersAdd />} /> Adicionei essa linha

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
