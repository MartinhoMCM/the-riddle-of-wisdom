import {GenerativeModel, GoogleGenerativeAI,GenerationConfig } from "@google/generative-ai"

export class ChatService {

  model: GenerativeModel;
  generationConfig: GenerationConfig;
  genAI: GoogleGenerativeAI;

    constructor(){
      this.generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };


      this.genAI = new GoogleGenerativeAI('AIzaSyCsYE1PfRvrFIl-egj6kB7pepOCQ1zamgQ');
      this.model = this.genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: " Categorias do jogo: Vocabulário, Países, Cidades, Sequência Matemática, Clubes de Futebol,  Celebridades, Títulos de Filmes",
      });
    }

    public async sendMessage(msg: string){
        const chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [
              {
                "role": "user",
                "parts": [
                  {
                    text: `Categoria: VOCABULARY, língua: pt`,
                  }
                ],
              },
              {
                "role": "model",
                "parts": [
                  {
                    text: `["Substância", "Jornalismo", "Capacidade", "Família", "Tecnologia", "Saúde", "Educação", "Cultura", "Amizade", "Felicidade", "História", "Natureza", "Ciência", "Política", "Economia", "Linguagem", "Literatura", "Música", "Arte", "Esporte"]`,
                  }
                ],
              },

              {
                "role": "user",
                "parts": [
                  {
                    text: `Categoria: COUNTRIES, língua: pt`,
                  }
                ],
              },
              {
                "role": "model",
                "parts": [
                  {
                    text: `["Brasil", "Angola", "Portugal", "Moçambique", "Cabo Verde", "Guiné-Bissau", "São Tomé e Príncipe", "Timor-Leste", "Espanha", "França", "Alemanha", "Itália", "Japão", "China", "Índia", "Estados Unidos", "Canadá", "Argentina", "México", "Austrália"]`,
                  }
                ],
              },

              {
                "role": "user",
                "parts": [
                  {
                    text: `Categoria: VOCABULARY, língua: en`,
                  }
                ],
              },
              {
                "role": "model",
                "parts": [
                  {
                    text: `["Love", "Flash", "Lord", "Family", "Technology", "Health", "Education", "Culture", "Friendship", "Happiness", "History", "Nature", "Science", "Politics", "Empty", "Language", "Literature", "Music", "Art", "Sport"]`,
                  }
                ],
              },

              {
                "role": "user",
                "parts": [
                  {
                    text: `MATH_SEQUENCE, língua: pt`,
                  }
                ],
              },
              {
                "role": "model",
                "parts": [
                  {
                    text: `[0, 1, 1, 2, 3, 5, 8, 13]`,
                  }
                ],
              },

              {
                "role": "user",
                "parts": [
                  {
                    text: `MATH_SEQUENCE, língua: en`,
                  }
                ],
              },
              {
                "role": "model",
                "parts": [
                  {
                    text: `[0, 1, 1, 2, 3, 5, 8, 13]`,
                  }
                ],
              }     
            ]
        });
        const result = await chatSession.sendMessage(msg);
        return result.response.text();
    }

}