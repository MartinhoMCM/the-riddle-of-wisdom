import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { fonteWordsEn, fonteWordsPt } from "./data";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  title = 'the-riddle-of-wisdom';
  words : string = '';
  chances = 8;
  guessChar = '';
  isAi = false;
  isHuman = false;
  selectCategory = '';
  indexSelected = 0;

  categories = [
    'VOCABULARY',
    'COUNTRIES',
    'CITIES',
    'MATH_SEQUENCE',
    'FOOTBALL_CLUBS',
    'CELEBRITIES',
    'MOVIE_TITLES'
  ];

  form : FormGroup;
  states = [
    {name: 'English', abbrev: 'en'},
    {name: 'Português', abbrev: 'pt'},
   
  ];
  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
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
    this.words = this.InitChar();
    this.getLanguage();
  }

  generateWord() : string{
    return fonteWordsEn[Math.floor(Math.random()*fonteWordsEn.length)];
  }

  InitChar() : string{
    this.selectCategory = this.categories[0];
    this.isHuman=true;
    const newWord = this.generateWord();
    this.words = newWord.substring(0,1);
    
    return this.words.toUpperCase();
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


startGame(){
  this.guessedByHuman();
  this.guessedByIA();
}

guessedByHuman(){
  this.guessChar = this.guessChar.trim();
  if (this.guessChar.length === 1){
    this.isHuman = false;
    this.isAi = true;
    this.words += this.guessChar.toUpperCase();
    this.guessChar = '';
  }
}

guessedByIA(){
  this.isAi = false;
  this.isHuman = true;
  const newWord = this.generateWord();
  this.words += newWord.substring(0,1).toUpperCase();
}

selectedCategory(index: number){
   this.selectCategory = this.categories[index];
   this.indexSelected = index; 
}

}
