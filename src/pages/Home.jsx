import Layout from "../components/Layout";
import { useEffect, useState } from 'react';
import { getStudentData } from '../services/api';

function Home(params) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStudentData();
        setStudent(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="p-4 space-y-6">
      {/* Skeleton del Perfil */}
      <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-6">
        <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-6 w-48"></div>
          <div className="skeleton h-4 w-32"></div>
        </div>
      </div>
      
      {/* Skeleton de las Stats (4 cuadros) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton h-24 w-full"></div>
        ))}
      </div>
    </div>
  );
  if (!student) return <p>Error al cargar datos.</p>;

  // Convertimos el base64 a una fuente válida para la etiqueta <img>
  const imageSource = `data:image/jpeg;base64,${student.foto}`;

  return (
    <>
      <Layout>
        <div className="p-4 space-y-6">
          {/* Perfil Header */}
          <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={imageSource} alt="Foto estudiante" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{student.persona}</h2>
              <p className="text-gray-500">No. Control: {student.numero_control}</p>
              <p className="text-sm">{student.email}</p>
            </div>
          </div>

          {/* Stats Académicos */}
          <div className="stats shadow w-full grid grid-cols-2 lg:grid-cols-4">
            <div className="stat">
              <div className="stat-title">Semestre</div>
              <div className="stat-value text-primary">{student.semestre}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Promedio</div>
              <div className="stat-value">{parseFloat(student.promedio_ponderado).toFixed(2)}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Avance</div>
              <div className="stat-value">{student.porcentaje_avance}%</div>
            </div>
            <div className="stat">
              <div className="stat-title">Créditos</div>
              <div className="stat-value">{student.creditos_acumulados}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
