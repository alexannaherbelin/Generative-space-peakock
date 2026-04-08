import { text } from './text.js';
//console.log(text);

//filter text
let lowerText = text.toLowerCase();
function removePunctuation(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9\s]/g, "");
    return cleanStr;
}
let nakedText = removePunctuation(lowerText);
//console.log(nakedText);

//count subsequent words
let words = nakedText.split(/\s+/);
let wordObjectArr = [];

class WordInfo {
    constructor(word, appearances){
        this.word = word;
        this.appearances = appearances;
    }
    displayInfo(){
        console.log("The word '" + this.word + "' appears " + this.appearances + " times in the text.");
    }
}
words.forEach(word => {
    let same = false;
    for(var i = 0; i < wordObjectArr.length; i++){
        if(word === wordObjectArr[i].word){
            same = true;
            console.log(wordObjectArr[i].word)
            wordObjectArr[i].appearances += 1
            break;
        }
    }
    if(!same){
        wordObjectArr.push(new WordInfo(word, 1));
    }
});
console.log(wordObjectArr);

/*
let freq = {}

//loop through every word

if(freq does not contain word[i])

*/