"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, Info } from "./types/types";
import { get20Characters } from "./lib/api/utils";
import Paginador from "./components/Paginador";


const CharactersPage =() =>{
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<Info | null>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setError("");
        const data = await get20Characters(page);
        setCharacters(data.results);
        setInfo(data.info);
      } catch {
        setError("No se pudieron cargar los personajes.");
      }
    };

    loadCharacters();
  }, [page]);

  const handleClick =(id: number) => {
    router.push(`/character/${id}`)
  }  

  return (
    <div className="character-grid">
      <h1>Personajes</h1>
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
}

export default CharactersPage