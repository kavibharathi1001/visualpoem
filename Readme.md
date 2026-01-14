System Architecture: The "Affective Synthesis" Pipeline
To achieve true "human-like" empathy, Visual Poem utilizes a Modular Multimodal Architecture. Instead of a single "black box" model, we pipeline three distinct neural processes:

1. Computer Vision & Scene Parsing (The Perception Layer)
Model: ViT-L/14 (Vision Transformer) combined with CLIP.

Process: We don't just extract labels (e.g., "dog," "beach"). We extract Global Image Embeddings.

Technical Edge: I implement Cross-Attention Mechanisms to focus on the "Salient Emotional Centers" of an image (e.g., the specific curve of a smile or the harshness of a shadow) rather than the background noise.

2. The Emotional Inference Engine (The Reasoning Layer)
Technology: A custom Graph Neural Network (GNN).

Logic: This layer maps visual features to a 3D VAD Model (Valence, Arousal, Dominance).

Example: High contrast + Deep Reds = High Arousal (Passion or Anger). Low Light + Blue Tones = Low Valence (Melancholy).

Coding Skill: I utilize Zero-Shot Transfer Learning to allow the system to recognize "unseen" emotions based on textual descriptions of feelings from a curated poetry dataset.

3. Lyrical Generation & Fine-Tuning (The Creative Layer)
Model: Llama 3.1 (70B) or GPT-4o fine-tuned via LoRA (Low-Rank Adaptation).

Dataset: I curated a specialized dataset of 50,000+ poems, filtered for "emotional resonance" rather than just rhyming.

Technique: Chain-of-Thought (CoT) Prompting is embedded in the backend. The system first "thinks" about the emotion, writes a "mood brief," and then generates the poem based on that brief.

The Code Stack
Backend: Python / FastAPI ,Typescript(for high-speed asynchronous processing).

Inference: ONNX Runtime or TensorRT (to ensure poem generation happens in < 2 seconds).

Database: Pinecone or Milvus (Vector Database) to store user "emotional preferences" and improve the model over time.

Frontend: Flutter or React Native for a fluid, "zen-like" UI experience.
