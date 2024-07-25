import {GoogleGenerativeAI } from "@google/generative-ai"

export class DataProcessing {

    constructor(){}

    generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

    genAI = new GoogleGenerativeAI('AIzaSyCsYE1PfRvrFIl-egj6kB7pepOCQ1zamgQ');
    model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: " Categorias do jogo: Vocabulário, Países, Cidades, Sequência Matemática, Clubes de Futebol,  Celebridades, Títulos de Filmes",
    });



    public async sendMessage(msg: string){
        const chatSession = this.model.startChat({
            generationConfig: this.generationConfig,
            history: [
                {
                    "role": "user",
                    "parts": [
                        {
                            text:"Estou criando um jogo denominado \"The Riddle of Wisdom\", um jogo entre a IA e um Humano.\nO jogo tem categorias descritas no 'System Instructions'.\nAprenda com este modelo, na categoria de Vocabulárbio:\n\nIA: M\nHumano: MO\nIA: MOV\nHumano: MOVI\nIA: MOVIM\nHumano: MOVIME\nIA: MOVIMEN\nHumano: MOVIMENT\nIA: MOVIMENTO",
                        },

                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                        {
                            text: "Parece que você está criando um jogo divertido e desafiador! O exemplo com a palavra \"MOVIMENTO\" demonstra bem a dinâmica do jogo, onde a IA e o humano alternam a adição de letras para formar a palavra final.\n\nÉ importante ter em mente que, para o jogo ser interessante, a IA precisa ser capaz de:\n\n* **Escolher uma palavra aleatória dentro da categoria.**\n* **Criar uma sequência lógica de letras, adicionando uma letra por vez, para desafiar o humano.** \n* **Identificar se a sequência do humano está correta ou não.** \n* **Manter o jogo equilibrado, garantindo que o humano tenha chances de adivinhar a palavra.**\n\nAlguns exemplos de como a IA poderia jogar na categoria \"Vocabulário\" com diferentes níveis de dificuldade:\n\n**Fácil:**\n\n* **IA:**  C\n* **Humano:**  CA\n* **IA:**  CAL\n* **Humano:**  CALO\n* **IA:**  CALOR\n\n**Médio:**\n\n* **IA:**  E\n* **Humano:**  ES\n* **IA:**  ESC\n* **Humano:** ESCR\n* **IA:**  ESCRIT\n* **Humano:**  ESCRITO\n\n**Difícil:**\n\n* **IA:**  M\n* **Humano:**  ME\n* **IA:**  MEL\n* **Humano:**  MELO\n* **IA:**  MELOD\n* **Humano:**  MELODI\n* **IA:**  MELODIA\n\nPara criar uma IA mais sofisticada, você pode implementar algoritmos de inteligência artificial que:\n\n* **Analisem o banco de palavras da categoria e escolham palavras com diferentes níveis de dificuldade.**\n* **Ajustem a dificuldade do jogo de acordo com o desempenho do humano.**\n* **Utilizem estratégias para criar sequências de letras desafiadoras.**\n\nLembre-se de que o objetivo é criar um jogo divertido e desafiador para ambos os jogadores. \n\nEspero que essas dicas ajudem você a desenvolver \"The Riddle of Wisdom\"! Boa sorte! \n",
                        }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                        {
                            text:  "Outra regra, quando eu digitar a categoria e a língua (pt ou en), você chuta uma palavra.\n\n\n",
                        }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                        {
                            text:  "Entendido! Vou tentar adivinhar palavras na categoria que você escolher, em português ou inglês, de acordo com a sua escolha. \n\nDiga a categoria e a língua, e eu farei o meu melhor para chutar uma palavra! 😊 \n",
                        }

                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "categoria: vocabulário, língua: pt"
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text:  "Adivinhei! \n\n**SOL** \n\nAcertei? 🤔 \n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "Não, chute apenas uma palavra",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                       {
                        text: "Desculpe! \n\nVou tentar de novo: \n\n**CÃO**\n\nVocê está pensando em \"CÃO\"? 🐶 \n",
                       }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                        {
                            text:  "Não, chute apenas uma letra e depois o humano vai inserir outra e assim alternadamente",
                        }
                     
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                    {
                        text: "Entendido! 😊 Vou começar com uma letra.\n\n**R**\n\nAgora é a sua vez! Adicione uma letra para formar uma palavra em português. 😄 \n",
                    }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text:  "RO",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text:  "Ok! 😄 Minha vez:\n\nRO**SA**\n\nSua vez de adicionar uma letra! 🌹 \n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "Devias colocar ROS",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Ops! Você está certo! \n\nDeveria ter colocado ROS.  \n\nMeu erro, desculpe!  \n\nVamos continuar! 😄 Sua vez de adicionar uma letra. \n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "Categoria: Vocabulário, língua: pt",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Ok! 😄 \n\nVou começar com a letra:\n\n**A**\n\nSua vez de adicionar uma letra e formar uma palavra em português! \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "AM",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text: "Legal! 🤩 \n\nMinha vez:\n\nAM**O**\n\nSua vez de adicionar uma letra!  🥰 \n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "AMOS",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Acertou em cheio! 🎉\n\nAMOS é a palavra! 😁\n\nParabéns! Você venceu este round. 😄\n\nVamos jogar novamente? Qual categoria você escolhe? \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "Categoria: Vocabulário, língua: pt",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text:"Ok! 😄  Vamos jogar novamente! \n\nComeço com a letra:\n\n**T**\n\nSua vez de adicionar uma letra e formar uma palavra em português!  \n\n\n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "TO",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text: "Legal!  😁 \n\nMinha vez:\n\nTO**R**\n\nSua vez de adicionar uma letra!  \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "TORR",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text: "Acertou! 🎉 \n\nMinha vez:\n\nTORR**E**\n\nSua vez de adicionar uma letra!  \n\n\n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "Não, você sempre irá a começar a adicionar a letra.",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text: "Oops! Desculpe, esqueci dessa regra! 😅 \n\nVocê tem razão, eu deveria ter adicionado a letra \"E\" e deixado para você continuar.  \n\nVamos recomeçar então! \n\nComeço com a letra: \n\n**T**\n\nSua vez! 😉 \n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "TO",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Ok! 😄  Minha vez:\n\nTO**M**\n\nSua vez de adicionar uma letra! \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text: "V",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text:   "Que jogada inteligente! 😅  \n\nVocê está certo! \n\nA palavra é TOM!  \n\nParabéns! Você venceu novamente! 🎉 \n\nQuer jogar mais uma rodada?  😊 \n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text:  "quando o humano não seguir a regra ou erra, passa a mensagem em json:\n{\n   lose: 'Perdeste'\n}\nCaso acertar , no final passe a mensagem:\n{\n win: 'Ganhaste'\n}",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Entendido! Vou seguir essas regras a partir de agora. 😊 \n\nVamos começar uma nova partida! \n\nComeço com a letra:\n\n**C**\n\nSua vez de adicionar uma letra! \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "CS",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Minha vez:\n\nCS**A**\n\nSua vez! 😄 \n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "CSAA",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "{\n   \"lose\": \"Perdeste\"\n} \n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                      {
                        text: "Categoria: Cidade, língua: pt",
                      }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "Ok!  Começando uma nova partida na categoria \"Cidade\", em português.  \n\nComeço com a letra:\n\n**L**\n\nSua vez! 😄 \n\n\n",
                     }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "LO",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                      {
                        text: "Minha vez:\n\nLO**N**\n\nSua vez! 😄 \n\n\n",
                      }
                    ],
                  },
                  {
                    "role": "user",
                    "parts": [
                     {
                        text:  "LONDR",
                     }
                    ],
                  },
                  {
                    "role": "model",
                    "parts": [
                     {
                        text:  "{\n  \"lose\": \"Perdeste\"\n} \n",
                     }
                    ],
                  },
            ]
        });
        const result = await chatSession.sendMessage(msg);
        return result.response.text();
    }

}