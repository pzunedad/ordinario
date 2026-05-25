import { Character, ResultCharacters } from "@/app/types/types"
import api from "./axios"

type CharactersFilters = {
    status?: string;
    gender?: string;
    name?: string;
}

export const get20Characters = async(page:number) => {
    const response = await api.get<ResultCharacters>(`/character?page=${page}`)
    return response.data
}

export const getCharacterByID = async(id: number) => {
    const response = await api.get<Character>(`/character/${id}`);
    return response.data;
}