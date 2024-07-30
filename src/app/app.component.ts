import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './data-ai-processing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'the-riddle-of-wisdom';
  words ="";
  chances = 8;
  guessChar = '';
  isAi = false;
  isHuman = false;
  selectCategory = '';
  indexSelected = 0;
  geminiIsProcessing = false;
  categories = [
    'VOCABULARY',
    'COUNTRIES',
    'CITIES',
    'MATH_SEQUENCE',
    'FOOTBALL_CLUBS',
    'CELEBRITIES',
    'MOVIE_TITLES'
  ];

  totalWords = 0;
  completedWords = 0;
  currentWord = '';
  guessedWord = '';

  form : FormGroup;
  states = [
    {name: 'English', abbrev: 'en'},
    {name: 'Português', abbrev: 'pt'},
   
  ];

  currentLang : string='en'

  fonteWordsEn = [];
  fonteWordsPt = [];
  fonteWords : string [] = [];

  maskedWord: string;

  constructor(private translate: TranslateService, private dataProcessing: ChatService ){
    translate.setDefaultLang('pt');
    this.form = new FormGroup({
      state: new FormControl(this.states[0]),
    });
  }

  getLanguage(){
    this.form.get('state').valueChanges.subscribe(value => {
      if (value) {
        this.switchLanguage(value.abbrev);
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.getLanguage();
    this.Initilization();
  }

  async InitChar() : Promise<void>{
    this.selectCategory = this.categories[4];
    const newSeq = await this.dataProcessing.sendMessage(`Categoria: ${this.selectCategory}, língua: ${this.states[0].abbrev}`);  
    
    this.fonteWords =  this.processedData(newSeq)
    this.generateWord();

  }

  processedData(data: string) : string []{
    const regex = /\[(.*?)\]/;
    const match = data.match(regex);

    if (match) {
      const conteudo = match[1];
      const arrayDeStrings = JSON.parse(`[${conteudo}]`); 

      return arrayDeStrings;
    }

    return [];
  }


 youLose () {
  //  showMessage(`You Lose! The word was ${newWord.toUpperCase()}.`);
  //  resetCard.style.backgroundImage = `url(assets/rain.gif)`;
  //  gameEnd();
}

youWin () {
  //  showMessage(`Congratulations, You Win! The word was ${newWord.toUpperCase()}.`);
 //   resetCard.style.backgroundImage = `url(assets/confetti.gif)`;
   // gameEnd();
}


 public async Initilization(): Promise<void> {
  this.switchLanguage(this.states[0].abbrev);  
  await this.InitChar();  
  console.log("currentWord ",this.currentWord);
  
  this.maskedWord = this.maskWord(this.currentWord);
  this.isHuman = true;
  this.displayWord();
}

public startGame(){
   if (this.guessChar) {
    this.userGuess(this.guessChar);
   }
}

selectedCategory(index: number){
   this.selectCategory = this.categories[index];
   this.indexSelected = index; 
}

removeSpaces(input: string): string {
  return input.replace(/\s+/g, '');
}

generateWord(){
  if (this.fonteWords.length > 0) {
    const word = this.fonteWords[Math.floor(Math.random()*this.fonteWords.length)];
    this.currentWord = word.toUpperCase();
    this.guessedWord = this.currentWord.substring(0,1);   
  }
}

private maskWord(word: string): string {
  if (word.length < 2) return word;
  return word[0] + "■".repeat(word.length - 2) + word[word.length - 1];
}

private revealLetter(letter: string): boolean {
  this.guessedWord += ""+letter;
  console.log("guessedWord ", this.guessedWord);
  
  return  this.currentWord.includes(this.guessedWord);
}

public displayWord(): void {
  console.log(this.maskedWord);
}

public userGuess(letter: string): void {
  if (this.isHuman) {
    const contains = this.revealLetter(letter);
    if (contains) {
      this.displayWord();
    } else {
      console.log("errado, insira outro caracter");
      
    }
  
    // if (this.maskedWord === this.currentWord) {
    //   console.log('Parabéns! Você completou a palavra.');
    // } else {
    //   console.log('Agora é a vez do computador.');
    //   this.isHuman = false;
    //   this.computerGuess();
    // }
  } else {
    console.log('Não é sua vez.');
  }
 this.guessChar='';
}

private computerGuess(): void {
  if (!this.isHuman) {
    const letter = this.getRandomLetter();
    console.log(`Computador adivinhou: ${letter}`);
    this.revealLetter(letter);
    this.displayWord();
    if (this.maskedWord === this.currentWord) {
      console.log('Computador completou a palavra.');
    } else {
      this.isHuman = true;
      console.log('Agora é a vez do usuário.');
    }
  }
}

private getRandomLetter(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}



}