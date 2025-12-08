import { PoemMode } from './types';

export const PROMPT_TEMPLATES = {
  [PoemMode.GENERAL]: "Write a descriptive poem inspired by the attached image. Focus on capturing the mood, atmosphere, and key visual elements (like colors, textures, and subjects). Use figurative language (metaphor, simile, personification) to bring the scene to life. The poem should have a tone that matches the overall feeling of the picture.",
  
  [PoemMode.STYLE]: (form: string) => `Create a ${form} based on the attached image. The poem should explore the visual themes present in the image. The language should be evocative, using the imagery from the picture as its central motif. Adhere strictly to the structural rules of a ${form}.`,
  
  [PoemMode.NARRATIVE]: (tone: string) => `Analyze the attached image and write a poem that tells a story or evokes a deep feeling. The poem should convey a sense of ${tone} and suggest a narrative or internal life that the visual implies. Focus on the perspective of a subject within the scene.`,
  
  [PoemMode.BEST]: "Write a deeply evocative, free-verse poem based entirely on the attached image. Identify the central subject(s) and their relationship. Describe the atmosphere and lighting using vivid color imagery and sensory details (sound, texture, smell, if implied). Establish a strong mood. Use at least one metaphor or simile derived directly from the picture's elements. The final poem should be about 12-16 lines long."
};

export const SAMPLE_IMAGES = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1039/600/400", 
  "https://picsum.photos/id/1043/600/400"
];
