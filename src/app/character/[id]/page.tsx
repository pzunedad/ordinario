"use client";

import { useEffect, useState } from "react";
import { useParams , useRouter} from "next/navigation";
import { getCharacterByID } from "@/app/lib/api/utils";
import { Character } from "@/app/types/types";
import "./page.css"


const CharacterDetailPage =() =>{
  const params = useParams();
  const id = params?.id;
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setError("");
        const data = await getCharacterByID(Number(id));
        setCharacter(data);
      } catch {
        setError("No se pudo cargar el personaje.");
      }
    };

    if (id) loadCharacter();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!character) return <p>Cargando personaje...</p>;
  

  const handleBack =() => {
    router.back();
  }

  return (
    <div>
      <div className="characterCard">
        <img src={character.image} alt={character.name} className="character-image"/>
        <h1>{character.name}</h1>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Estado:</strong> {character.status}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>ID: </strong> {character.id}</p>
        <p><strong>Origen:</strong> {character.origin.name}</p>
        <p><strong>Ubicación actual:</strong> {character.location.name}</p>
        <button onClick={()=> handleBack()}> Volver</button>
      </div>
    </div>
  );
}

export default CharacterDetailPage