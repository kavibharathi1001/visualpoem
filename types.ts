export enum PoemMode {
  GENERAL = 'GENERAL',
  STYLE = 'STYLE',
  NARRATIVE = 'NARRATIVE',
  BEST = 'BEST',
}

export enum PoeticForm {
  FREE_VERSE = 'Free Verse',
  HAIKU = 'Haiku',
  SONNET = 'Sonnet',
  LIMERICK = 'Limerick',
  VILLANELLE = 'Villanelle',
  ELEGY = 'Elegy',
}

export enum EmotionalTone {
  HOPEFUL = 'Hopeful',
  MELANCHOLY = 'Melancholy',
  WHIMSICAL = 'Whimsical',
  MYSTERIOUS = 'Mysterious',
  ROMANTIC = 'Romantic',
}

export interface PoemOptionsState {
  mode: PoemMode;
  form: PoeticForm;
  tone: EmotionalTone;
  customTopic: string;
}

export interface GeneratedPoem {
  title?: string;
  content: string;
  analysis?: string;
}
