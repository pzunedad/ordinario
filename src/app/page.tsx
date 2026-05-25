"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, Info } from "./types/types";
import { get20Characters } from "./lib/api/utils";
import Paginador from "./components/Paginador";
import Filtros from "./components/Filtros";
import "./page.css";

const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alive");
  const [genderFilter, setGenderFilter] = useState("Male");
  const [nameFilter, setNameFilter] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setError("");
        const data = await get20Characters(page, {
          status: statusFilter,
          gender: genderFilter,
          name: nameFilter,
        });
        setCharacters(data.results);
        setInfo(data.info);
      } catch {
        setCharacters([]);
        setInfo(null);
        setError("No se encontraron personajes con esos filtros.");
      }
    };

    loadCharacters();
  }, [page, statusFilter, genderFilter, nameFilter]);

  const handleClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  const handleStatusChange = (status: string) => {
    setPage(1);
    setStatusFilter(status);
  };

  const handleGenderChange = (gender: string) => {
    setPage(1);
    setGenderFilter(gender);
  };

  const handleNameSearch = (name: string) => {
    setPage(1);
    setNameFilter(name);
  };

  return (
    <div className="character-grid">
      <h1>Personajes de Rick y Morty</h1>

      <Filtros
        EstadoCambio={handleStatusChange}
        GeneroCambio={handleGenderChange}
        NombreBusqueda={handleNameSearch}
      />

      {error && <p>{error}</p>}

      <div className="character-item">
        {characters.map((character) => (
          <div key={character.id} onClick={() => handleClick(character.id)}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Estado: {character.status}</p>
            <p>Genero: {character.gender}</p>
          </div>
        ))}
      </div>

      {info && (
        <Paginador
          next={Boolean(info.next)}
          prev={Boolean(info.prev)}
          page={page}
          totalPages={info.pages}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default CharactersPage;