const COLOR_WORDS = ['red', 'green', 'blue'];
const COLOR_WORDS_COUNT = COLOR_WORDS.length;

export function generateMatchingWordAndColor () {
    const word = COLOR_WORDS[ Math.floor( Math.random() * COLOR_WORDS_COUNT ) ]
    return [word, word];
};
    
export function generateMismatchedWordAndColor () {
    const randomWord = COLOR_WORDS[ Math.floor( Math.random() * COLOR_WORDS_COUNT ) ];
    let randomColor = COLOR_WORDS[ Math.floor( Math.random() * COLOR_WORDS_COUNT ) ];
    
    while (randomWord === randomColor) {
        randomColor = COLOR_WORDS[ Math.floor( Math.random() * COLOR_WORDS_COUNT ) ];
    }
    
    return [randomWord, randomColor];
};