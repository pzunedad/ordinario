"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, Info } from "./types/types";
import { get10Characters } from "./lib/api/utils";


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
        const data = await get10Characters(page);
        setCharacters(data.results);
        setInfo(data.info);
      } catch {
        setError("No se pudieron cargar los personajes.");
      }
    };

    loadCharacters();
  }, [page]);

  return (
    <div>
      <h1>Personajes</h1>
      {error && <p>{error}</p>}
      <div>
        {characters.map((character) => (
          <div key={character.id} onClick={() => router.push(`/characters/${character.id}`)}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersPage