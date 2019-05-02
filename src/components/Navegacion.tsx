import React from "react";

type INavegacionProps = {
  paginaAnterior: () => void;
  paginaSiguiente: () => void;
  pagina: number;
  totalPaginas: number;
};
function Navegacion(props: INavegacionProps) {
  const mostrarAnterior = () => {
    const { pagina } = props;
    if (pagina === 1) return null;
    return (
      <button
        onClick={props.paginaAnterior}
        type="button"
        className="btn btn-info mr-1"
      >
        Anterior &larr;
      </button>
    );
  };

  const mostrarSiguiente = () => {
    const { pagina, totalPaginas } = props;
    if (pagina === totalPaginas) return null;
    return (
      <button
        onClick={props.paginaSiguiente}
        type="button"
        className="btn btn-info"
      >
        Siguiente &rarr;
      </button>
    );
  };

  return (
    <div className="py-5">
      {mostrarAnterior()}
      {mostrarSiguiente()}
    </div>
  );
}

export default Navegacion;
