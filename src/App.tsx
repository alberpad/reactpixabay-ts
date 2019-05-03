import React from "react";
import axios from "axios";

import Buscador from "./components/Buscador";
import Resultado from "./components/Resultado";

import "./App.css";

interface IAppState {
  termino: string;
  imagenes: any[];
  pagina: number;
  cargando: boolean;
  totalPaginas: number;
  porPagina: number;
}
class App extends React.Component<{}, IAppState> {
  state = {
    termino: "",
    imagenes: [],
    pagina: 0,
    cargando: false,
    totalPaginas: 0,
    porPagina: 20
  };

  consultarApiPixabay = async () => {
    const { termino, pagina, porPagina } = this.state;
    const url = `https://pixabay.com/api/?key={API_KEY}&q=${termino}&per_page=${porPagina}&page=${pagina}`;
    this.setState({
      cargando: true
    });
    const response = await axios.get(url);
    const totalPaginas = Math.ceil(response.data.totalHits / porPagina);
    this.setState({
      imagenes: response.data.hits,
      cargando: false,
      totalPaginas
    });
  };

  datosBusqueda = (termino: string) => {
    this.setState(
      {
        termino,
        pagina: 1
      },
      // Esto es un callback que se ejecuta cada vez que se actualiza el estado
      () => {
        this.consultarApiPixabay();
      }
    );
  };

  paginaAnterior = () => {
    let { pagina } = this.state;
    if (pagina === 1) return;
    pagina -= 1;
    this.setState(
      {
        pagina
      },
      () => {
        this.consultarApiPixabay();
        this.scroll();
      }
    );
  };

  paginaSiguiente = () => {
    let { pagina } = this.state;
    const { totalPaginas } = this.state;
    if (pagina === totalPaginas) return;
    pagina += 1;
    this.setState(
      {
        pagina
      },
      () => {
        this.consultarApiPixabay();
        this.scroll();
      }
    );
  };

  scroll = () => {
    const elemento: Element | null = document.querySelector(".jumbotron");
    if (elemento) elemento.scrollIntoView(true);
  };

  render() {
    const { cargando, imagenes, pagina, totalPaginas } = this.state;

    let resultado;
    if (cargando) {
      resultado = (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      );
    } else {
      resultado = (
        <Resultado
          imagenes={imagenes}
          paginaAnterior={this.paginaAnterior}
          paginaSiguiente={this.paginaSiguiente}
          pagina={pagina}
          totalPaginas={totalPaginas}
        />
      );
    }

    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">{resultado}</div>
      </div>
    );
  }
}

export default App;
