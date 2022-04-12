"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/); ["cat", "hat"]
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat" ,"cat", "hat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null]
   *  }
   * 
   * */

  getChains() {
    // TODO: implement this!
    const markovObj = {}

    for (let i = 0; i < this.words.length; i++) {

      if (markovObj[this.words[i]] === undefined) {
        markovObj[this.words[i]] = [this.words[i+1] || null];
      }
      else {
        markovObj[this.words[i]].push(this.words[i+1] || null) ;
      }
    }
    return markovObj;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    //this.chains = markov obj {"the" : [cat,hat,].....} 
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let currWord = this.words[0];
    let resultStr = this.words[0];

    while (currWord !== null) {
      const wordOptions = this.chains[currWord];
      let nextWord = wordOptions[Math.floor(Math.random()*wordOptions.length)];
      if (nextWord !== null) {
        resultStr += " " + nextWord;
      }
      currWord = nextWord;
    }

    return resultStr;
  }
}


