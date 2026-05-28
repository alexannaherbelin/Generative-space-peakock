import { text } from './text.js';

function preprocessText(rawText) {
    let body = rawText;
    body = body.toLowerCase();
    body = body.replace(/[^a-z0-9\s]/g, "");
    return body.split(/\s+/).filter(w => w.length > 0);
}

function buildFrequencyMap(words) {
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

    for(let i = 0; i < words.length - 1; i++){
        let word = words[i];
        let nextWord = words[i + 1];

        let same = false;
        for(let j = 0; j < wordObjectArr.length; j++){
            if(word === wordObjectArr[j].word){
                same = true;
                wordObjectArr[j].appearances += 1;
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

    return wordObjectArr;
}

function generateText(wordObjectArr, words, numWordsGenerated) {
    let currentWord = wordObjectArr[Math.floor(Math.random() * wordObjectArr.length)];
    const output = [];

    for(let i = 0; i < numWordsGenerated; i++){
        output.push(currentWord.word);

        let nextWordsArr = Object.values(currentWord.nextWords);
        if(nextWordsArr.length === 0) break;

        let weightedNextWords = [];
        nextWordsArr.forEach(nextWordObj => {
            for(let j = 0; j < nextWordObj.frequency; j++){
                weightedNextWords.push(nextWordObj.word);
            }
        });

        const nextWord = weightedNextWords[Math.floor(Math.random() * weightedNextWords.length)];
        currentWord = wordObjectArr.find(wordObj => wordObj.word === nextWord);
        if(!currentWord) break;
    }

    return output.join(" ");
}

const words = preprocessText(text);
const wordObjectArr = buildFrequencyMap(words);
const generated = generateText(wordObjectArr, words, 50);

console.log(generated);