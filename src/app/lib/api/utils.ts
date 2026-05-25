import { Character, ResultCharacters } from "@/app/types/types";
import api from "./axios";

type CharactersFilters = {
  status?: string;
  gender?: string;
  name?: string;
};

export const get20Characters = async (page: number, filters?: CharactersFilters) => {
  const params = new URLSearchParams({ page: String(page) });

  if (filters?.status) {
    params.set("status", filters.status);
  }

  if (filters?.gender) {
    params.set("gender", filters.gender);
  }

  if (filters?.name) {
    params.set("name", filters.name);
  }

  const response = await api.get<ResultCharacters>(`/character?${params.toString()}`);
  return response.data;
};

export const getCharacterByID = async (id: number) => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};