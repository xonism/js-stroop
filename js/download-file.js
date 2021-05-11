import { numberOfWords } from './stroop.js';

export function createFile () {
    let textFile = null;

    function makeTextFile (text) {
        const data = new Blob ( [text], { type: 'text/plain' } );
        
        if ( textFile !== null ) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    document.getElementById('download-link').href = makeTextFile(`Number of words: ${numberOfWords}.\n`);
}