import React, { Component } from "react";

import Imagen from "./Imagen";
import Navegacion from "./Navegacion";

interface IResultadoProps {
  imagenes: any[];
  paginaAnterior: () => void;
  paginaSiguiente: () => void;
  pagina: number;
  totalPaginas: number;
}
class Resultado extends Component<IResultadoProps> {
  mostrarImagenes = () => {
    const { imagenes, pagina, totalPaginas } = this.props;
    if (imagenes.length === 0) return null;
    return (
      <React.Fragment>
        <div className="col-12 p-5 row">
          {imagenes.map(imagen => (
            <Imagen key={imagen.id} imagen={imagen} />
          ))}
        </div>
        <Navegacion
          paginaAnterior={this.props.paginaAnterior}
          paginaSiguiente={this.props.paginaSiguiente}
          pagina={pagina}
          totalPaginas={totalPaginas}
        />
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.mostrarImagenes()}</React.Fragment>;
  }
}

export default Resultado;