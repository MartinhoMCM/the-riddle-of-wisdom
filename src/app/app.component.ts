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
  words = "";
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

  form: FormGroup;
  states = [
    { name: 'English', abbrev: 'en' },
    { name: 'Português', abbrev: 'pt' },

  ];

  currentLang: string = 'en'

  fonteWordsEn = [];
  fonteWordsPt = [];
  fonteWords: string[] = [];

  maskedWord: string;
  numberOfTrying = 0;
  isWin = false;
  isLose = false;
  totalGuesses = 5;
  reloading = false;

  constructor(private translate: TranslateService, private dataProcessing: ChatService) {
    translate.setDefaultLang('pt');
    this.form = new FormGroup({
      state: new FormControl(this.states[0]),
    });
  }

  getLanguage() {
    this.form.get('state').valueChanges.subscribe(value => {
      if (value) {
        this.switchLanguage(value.abbrev);
      }
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.restartGame();
  }

  ngOnInit(): void {
    this.getLanguage();
    this.reset();
    this.Initilization();
  }

  async InitChar(): Promise<void> {
    this.selectCategory = this.categories[0];
    this.reloading = true;
    const newSeq = await this.dataProcessing.sendMessage(`Categoria: ${this.selectCategory}, língua: ${this.states[0].abbrev}`);
    this.reloading = false;
    this.fonteWords = this.processedData(newSeq);

    this.generateWord();

  }

  processedData(data: string): string[] {
    const regex = /\[(.*?)\]/;
    const match = data.match(regex);
    if (this.selectCategory === 'MATH_SEQUENCE') {
      return JSON.parse(data);
    }

    if (match) {
      const conteudo = match[1];
      const arrayDeStrings = JSON.parse(`[${conteudo}]`);

      return arrayDeStrings;
    }

    return [];
  }


  youLose() {
    //  showMessage(`You Lose! The word was ${newWord.toUpperCase()}.`);
    //  resetCard.style.backgroundImage = `url(assets/rain.gif)`;
    //  gameEnd();
  }

  youWin() {

  }


  public async Initilization(): Promise<void> {
    this.translate.use(this.states[0].abbrev);
    await this.InitChar();
    this.maskedWord = this.maskWord(this.currentWord);
    this.isHuman = true;
    this.displayWord();
  }

  async nextCategory(index: number): Promise<void> {
    const abbrev = this.form.get('state').value.abbrev;
    this.reloading = true;
    const newSeq = await this.dataProcessing.sendMessage(`Categoria: ${this.selectCategory}, língua: ${abbrev}`);
    this.reloading = false;
    this.fonteWords = this.processedData(newSeq)
    this.generateWord();
    this.maskedWord = this.maskWord(this.currentWord);
    this.isHuman = true;
    this.displayWord();
  }

  public startGame() {
    if (this.guessChar) {
      this.userGuess(this.guessChar);
    }
  }

  public restartGame() {
    this.reset();
    this.generateWord();
    this.maskedWord = this.maskWord(this.currentWord);
    this.isHuman = true;
    this.displayWord();
  }

  selectedCategory(index: number) {
    this.isWin = false;
    this.isLose = false;
    this.selectCategory = this.categories[index];
    this.indexSelected = index;
    this.nextCategory(index);
  }

  removeSpaces(input: string): string {
    return input.replace(/\s+/g, '');
  }

  generateWord() {
    if (this.fonteWords.length > 0) {
      const word = this.fonteWords[Math.floor(Math.random() * this.fonteWords.length)];
      if (this.selectCategory !== 'MATH_SEQUENCE') {
        this.currentWord = word.toUpperCase();
        this.guessedWord = this.currentWord.substring(0, 1);
      } else if (this.selectCategory === 'MATH_SEQUENCE') {
        this.clearAll();
        this.fonteWords.forEach(value => {
          this.currentWord += value;
          this.guessedWord = this.currentWord.substring(0, 1);
        });
      }

    }
  }


  clearAll() {
    this.currentWord = '';
    this.guessedWord = '';
  }

  reset() {
    this.currentWord = '';
    this.guessedWord = '';
    this.isWin = false;
    this.isLose = false;
    this.totalGuesses = 5;
    this.numberOfTrying = 0;
    this.guessChar = '';
  }

  private maskWord(word: string): string {
    if (word.length < 2) return word;
    if (word.length > 5) {
      const middleIndex = Math.floor(word.length / 2);
      return word[0] + "■".repeat(middleIndex - 1) + word[middleIndex] + "■".repeat(word.length - middleIndex - 2) + word[word.length - 1];
    }
    return word[0] + "■".repeat(word.length - 2) + word[word.length - 1];
  }

  public userGuess(letter: string): void {
    if (this.isHuman) {
      const contains = this.revealLetter(letter);
      if (contains) {
        this.displayWord();
      } else {
        this.numberOfTrying++;
        if (this.numberOfTrying === 5) {
          this.isLose = true;
          this.isWin = false;
        }
      }
    } else {
    }
    this.guessChar = '';
  }

  private revealLetter(letter: string): boolean {
    for (let i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === letter && this.maskedWord[i] === '■') {
        this.maskedWord = this.maskedWord.substring(0, i) + letter + this.maskedWord.substring(i + 1);
        return true;
      }
    }
    return false;
  }

  public displayWord(): void {
    if (this.maskedWord === this.currentWord) {
      this.isWin = true;
      this.isLose = false;
    }
  }

  tryExceeded(): boolean{
   return (this.totalGuesses-this.numberOfTrying) === 0;
  }

}