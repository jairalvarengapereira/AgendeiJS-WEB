import "./doctors.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Navbar from "../../components/navbar/navbar.jsx";
import api from "../../constantes/api.js";
import Doctor from "../../components/doctor/doctor.jsx";

function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [idDoctor, setIdDoctor] = useState("");

  function clickEdit(id_doctor) {
    navigate("/doctors/edit/" + id_doctor);
  }

  function clickDelete(id_doctor) {
    confirmAlert({
      title: "Exclusão",
      message: `Deseja mesmo excluir esse médico?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => DeleteDoctors(id_doctor)
        },
        {
          label: "Não",
          onClick: () => {}
        }
      ]
    });
  }

  async function LoadDoctors() {
    try {
      const response = await api.get('/doctors');
      
      if (response.data) {
        setDoctors(response.data);
      }      
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          navigate("/");
        }
      } else {
        alert("Erro ao listar médicos.");
      }
    }
  }

  async function DeleteDoctors(id) {
    try {
      await api.delete('/doctors/' + id);
      // Atualiza a lista de médicos removendo o médico excluído
      setDoctors(doctors.filter(doc => doc.id_doctor !== id));
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          navigate("/doctors");
        }
      } else {
        alert("Erro ao excluir dados.");
      }
    }
  }

  function changeDoctor(e) {
    setIdDoctor(e.target.value);
  }

  useEffect(() => {
    LoadDoctors(); 
  }, [idDoctor]);

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Médicos</h2>
          <Link to="/doctors/add" className="btn btn-outline-primary ms-5 mb-2">
            Novo Médico
          </Link>
        </div>

        <div className="d-flex justify-content-end">
          <div className="form-control ms-3">
            <select 
              name="doctor" 
              id="doctor" 
              value={idDoctor}
              onChange={changeDoctor}          
            >
              <option value="">Todos os médicos</option>
              {doctors.map((doc) => (
                <option key={doc.id_doctor} value={doc.id_doctor}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={LoadDoctors} className="btn btn-primary ms-3" type="submit">
            Filtrar
          </button>
        </div>
      </div>

      <div>
        <table className="table table-hover">
          <thead className="bold">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Especialidade</th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <Doctor 
                key={doc.id_doctor}
                id_doctor={doc.id_doctor} // Passe o id_doctor aqui
                doctor={doc.name}
                specialty={doc.specialty}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;
