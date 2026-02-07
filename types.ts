
export type RoseColor = 'Red' | 'Pink' | 'White' | 'Yellow' | 'Lavender';

export interface RoseMessage {
  text: string;
  poem: string;
  roseMeaning: string;
}

export interface GenerationState {
  loading: boolean;
  error: string | null;
  data: RoseMessage | null;
  audioUrl: string | null;
  imageUrl: string | null;
}
