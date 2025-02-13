import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import api from "../../constantes/api.js";

function DoctorsAdd() {
  const { id_doctor } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({ name: "", icon: "M", specialty: "" });
  const [services, setServices] = useState([]);

  async function loadDoctor(id) {
    try {
      const response = await api.get(`/doctors/${id}`);
      if (response.data) {

        // Verifique se response.data é um array
        const doctorData = Array.isArray(response.data) ? response.data[0] : response.data;

        // Verifique se specialty existe no objeto e defina um valor padrão
        setDoctor({
          ...doctorData,
          specialty: doctorData.specialty ?? "", // Usando coalescência nula
        });
      }
    } catch (error) {
      alert("Erro ao carregar médico");
      console.error("Erro:", error); // Logando erro para mais detalhes
    }
  }

  async function loadServices() {
    try {
      const response = await api.get(`/services`);
      if (response.data) {
        setServices(response.data);
      }
    } catch (error) {
      alert("Erro ao listar serviços");
    }
  }

  async function saveDoctor() {
    const json = {
      id_doctor: id_doctor,
      name: doctor.name,
      specialty: doctor.specialty, // Agora deve estar correto
      icon: doctor.icon,
    };
  
    try {
      const response = id_doctor
        ? await api.put(`/doctors/${id_doctor}`, json)
        : await api.post("/doctors", json);

      if (response.status === 200 || response.status === 201) { // Verificar se o status é de sucesso
        console.log("Médico salvo com sucesso:", response.data);
        navigate("/doctors");
      }
    } catch (error) {
      console.error("❌ Erro ao salvar médico:", error);
    }
  }
  

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (id_doctor) {
      loadDoctor(id_doctor);
    }
  }, [id_doctor, services]);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>{id_doctor ? "Editar Médico" : "Novo Médico"}</h2>
          </div>

          {/* Nome do Médico */}
          <div className="col-12 mt-4">
            <label htmlFor="doctor" className="form-label">Médico</label>
            <input
              type="text"
              name="doctor"
              id="doctor"
              className="form-control"
              value={doctor.name}
              onChange={(e) => setDoctor((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Digite o nome do médico"
            />
          </div>

          {/* Serviços */}
          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">Serviço</label>
            <select
              name="service"
              id="service"
              className="form-select"
              value={doctor.specialty} // Usa diretamente doctor.specialty
              onChange={(e) => setDoctor((prev) => ({ ...prev, specialty: e.target.value }))
              }
            >
              <option value="">Selecione o serviço</option>
              {services.map((s) => (
                <option key={s.id_service} value={s.description}>
                  {s.description}
                </option>
              ))}
            </select>
          </div>

          {/* Gênero */}
          <div className="col-12 mt-3">
            <label htmlFor="icon" className="form-label">Gênero</label>
            <select
              name="icon"
              id="icon"
              className="form-select"
              value={doctor.icon}
              onChange={(e) => setDoctor((prev) => ({ ...prev, icon: e.target.value }))}
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          {/* Botões */}
          <div className="col-12 mt-4">
            <div className="d-flex justify-content-end">
              <Link to="/doctors" className="btn btn-outline-primary me-3">
                Cancelar
              </Link>
              <button
                onClick={saveDoctor}
                type="button"
                className="btn btn-primary ms-2"
              >
                Salvar Dados
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorsAdd;
