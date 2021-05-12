import { numberOfWords } from './stroop.js';
import { domElements } from './dom-elements.js';

export function createFile () {
    let textFile = null;

    function makeTextFile (text) {
        const data = new Blob ( [text], { type: 'text/plain' } );
        
        if ( textFile !== null ) window.URL.revokeObjectURL(textFile);

        textFile = window.URL.createObjectURL(data);
        return textFile;
    }

    function getRadioButtonChoice () {
        const { wordMeaningRadioButton } = domElements.formElements;
        return wordMeaningRadioButton.checked ? "Evaluating Word Meaning" : "Evaluating Word Color";
    }

    domElements.buttons.download.href = makeTextFile(
        `Number of Words: ${numberOfWords}.\nTask Type: ${getRadioButtonChoice()}.\n`
    );
}