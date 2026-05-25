import { FormEvent, KeyboardEvent, useState } from "react";

type FiltrosProps = {
  EstadoCambio: (status: string) => void;
  GeneroCambio: (gender: string) => void;
  NombreBusqueda: (nombre: string) => void;
};

const opcionesEstado = ["Alive", "Dead", "unknown"];
const opcionesGenero = ["Male", "Female", "Genderless", "unknown"];

const Filtros = ({ EstadoCambio, GeneroCambio, NombreBusqueda }: FiltrosProps) => {
  const [estado, setEstado] = useState(0);
  const [genero, setGenero] = useState(0);
  const [nombre, setNombre] = useState("");

  const cambioEstado = () => {
    const nextIndex = (estado + 1) % opcionesEstado.length;
    setEstado(nextIndex);
    EstadoCambio(opcionesEstado[nextIndex]);
  };

  const cambioGenero = () => {
    const nextIndex = (genero + 1) % opcionesGenero.length;
    setGenero(nextIndex);
    GeneroCambio(opcionesGenero[nextIndex]);
  };

  const buscarNombre = (event?: FormEvent) => {
    event?.preventDefault();
    NombreBusqueda(nombre.trim());
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      buscarNombre();
    }
  };

  return (
    <form className="filters" onSubmit={buscarNombre}>
      <button type="button" onClick={cambioEstado}>
        Estado: {opcionesEstado[estado]}
      </button>

      <button type="button" onClick={cambioGenero}>
        Género: {opcionesGenero[genero]}
      </button>

      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
        onKeyDown={handleEnter}
      />

      <button type="submit">Buscar</button>
    </form>
  );
};

export default Filtros;