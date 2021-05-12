export const domElements = {
    buttons: {
        start: document.getElementById('start-button'),
        redChoice: document.getElementById('red-choice-button'),
        greenChoice: document.getElementById('green-choice-button'),
        blueChoice: document.getElementById('blue-choice-button'),
        download: document.getElementById('download-button'),
    },

    timeDivs: {
        matched: document.getElementById('matched-time-div'),
        mismatched: document.getElementById('mismatched-time-div'),
    },

    containers: {
        starting: document.getElementById('start-container'),
        test: document.getElementById('test-container'),
        result: document.getElementById('result-container'),
        error: document.getElementById('error-container'),
    },
    
    wordDisplayArea: document.getElementById('word-display-area'),
    incorrectDiv: document.getElementById('incorrect-div'),
    errorMessage: document.getElementById('error-message'),
    errorSound: document.getElementById('error-sound'),

    form: document.getElementById('form'),

    formElements: {
        stimulusNumberField: document.getElementById('stimulus-number'),
        questionIcon: document.getElementById('question-icon'),
        quantityInformation: document.getElementById('quantity-information'),
        wordMeaningRadioButton: document.getElementById('word-meaning'),
        wordColorRadioButton: document.getElementById('word-color'),
    },
};