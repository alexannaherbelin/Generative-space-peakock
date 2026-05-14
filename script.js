import { text } from './text.js';
//console.log(text);

//filter text
let lowerText = text.toLowerCase();
function removePunctuation(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9\s]/g, "");
    return cleanStr;
}
let nakedText = removePunctuation(lowerText);

//count subsequent words
let words = nakedText.split(/\s+/);
let wordObjectArr = [];

class WordInfo {
    constructor(word, appearances){
        this.word = word;
        this.appearances = appearances;
        this.nextWords = {};
    }
    displayInfo(){
        console.log("The word '" + this.word + "' appears " + this.appearances + " times in the text.");
    }
    addNextWord(nextWord){
        if(this.nextWords[nextWord]){
            this.nextWords[nextWord].frequency += 1;
        } else {
            this.nextWords[nextWord] = { word: nextWord, frequency: 1 };
        }
    }
}
for(var i = 0; i < words.length - 1; i++){
    let word = words[i];
    let nextWord = words[i + 1];


    let same = false;
    for(var j = 0; j < wordObjectArr.length; j++){
        if(word === wordObjectArr[j].word){
            same = true;
            wordObjectArr[j].appearances += 1
            wordObjectArr[j].addNextWord(nextWord);
            break;
        }
    }
    if(!same){
        let newWord = new WordInfo(word, 1);
        newWord.addNextWord(nextWord);
        wordObjectArr.push(newWord);
    }
}
console.log(wordObjectArr);

let numWordsGenerated = 10;
let firstWord = wordObjectArr[Math.floor(Math.random() * wordObjectArr.length)];
let currentWord = firstWord;
for(var i = 0; i < numWordsGenerated; i++){
    console.log(currentWord.word);
    
    //frequency of next words array randomly generated
    let nextWordsArr = Object.values(currentWord.nextWords);
    if(nextWordsArr.length === 0){
        break;
    }

   console.log(nextWordsArr);
    let weightedNextWords = [];
    nextWordsArr.forEach(nextWordObj => {
        for(var j = 0; j < nextWordObj.frequency; j++){
            weightedNextWords.push(nextWordObj.word);
        }
    });
    console.log(weightedNextWords);
    currentWord = wordObjectArr.find(wordObj => wordObj.word === weightedNextWords[Math.floor(Math.random() * weightedNextWords.length)]);

    //currentWord = nextWordsArr[Math.floor(Math.random() * nextWordsArr.length)];
}
/*
let freq = {}

//loop through every word

if(freq does not contain word[i])

*/