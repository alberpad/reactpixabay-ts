import React, { Component } from "react";

interface IBuscadorProps {
  datosBusqueda: (termino: string) => void;
}
class Buscador extends Component<IBuscadorProps> {
  busquedaRef = React.createRef<HTMLInputElement>();

  obtenerDatos = (e: React.FormEvent) => {
    e.preventDefault();
    const { datosBusqueda } = this.props;
    const termino = this.busquedaRef.current && this.busquedaRef.current.value;
    if (termino) datosBusqueda(termino);
  };

  render() {
    return (
      <form onSubmit={this.obtenerDatos}>
        <div className="row">
          <div className="form-group col-md-8">
            <input
              ref={this.busquedaRef}
              type="text"
              className="form-control form-control-lg"
              placeholder="Busca una imagen"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="submit"
              className="btn btn-danger btn-lg btn-block"
              value="Buscar"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Buscador;
