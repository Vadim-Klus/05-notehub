import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    BASE_URL,
    {
      headers,
      params: {
        page,
        perPage,
        search: search || undefined,
      },
    }
  );
  return response.data;
};

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(BASE_URL, noteData, {
    headers,
  });
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/${id}`,
    {
      headers,
    }
  );
  return response.data;
};
