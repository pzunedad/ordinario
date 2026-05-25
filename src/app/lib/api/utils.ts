import { Character } from "@/app/types/types"
import api from "./axios"

export const get10Characters = async(page:number) => {
    const response = await api.get<Character>(`/character?page=${page}`)
    return response.data
}

export const getCharacterByID = async(id: number) => {
    const response = await api.get<Character>(`/character/${id}`);
    return response.data;
}