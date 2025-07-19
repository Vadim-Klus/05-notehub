export interface Note {
  id: number;
  title: string;
  content: string;
  tag: string;
  created_at: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

export interface NotesResponse {
  results: Note[];
  total_pages: number;
}
