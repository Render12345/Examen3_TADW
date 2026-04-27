import Layout from "../components/Layout";

function Home(params) {
  return (
    <>
      <Layout>
        <div className="h-screen text-center p-8">
          <h1>Pagina de Home</h1>
          <button className="btn btn-primary">Boton para ver estilos</button>
          <button className="btn btn-secondary">Boton para ver estilos</button>
          <button className="btn btn-accent">Boton para ver estilos</button>
        </div>
      </Layout>
    </>
  );
}

export default Home;
