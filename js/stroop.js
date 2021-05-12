import { domElements } from './dom-elements.js';
import { TimeFunctions } from './time-functions.js';
import { generateMatchingWordAndColor, generateMismatchedWordAndColor } from './word-color-generation.js';
import { createFile } from './download-file.js';

const timeFunctions = new TimeFunctions();

export let numberOfWords;
export let evaluatingMeaningOrColor;

let matchedTimes = [];
let mismatchedTimes = [];

let matchingCounter = 0;
let mismatchedCounter = 0;
let incorrectCounter = 0;

domElements.formElements.quantityInformation.innerHTML = "Entering the number 15 will display 30 words in total - 15 with<br> matching meaning and color, 15 with mismatched meaning and color";

function addEventListenersToInformationIcon () {
    const { questionIcon, quantityInformation } = domElements.formElements;
    
    questionIcon.addEventListener("mouseover", function () {
        quantityInformation.style.display = "block";
    });

    questionIcon.addEventListener("mouseout", function () {
        quantityInformation.style.display = "none";
    });
}

const sumOfArray = ( array ) => array.reduce( ( a, b ) => a + b, 0 );
const getButtonText = ( button$ ) => button$.innerHTML;
const toggleDomElementsDisplay = ( elements$ ) => elements$.forEach( el$ => el$.classList.toggle('no-display') );

const getPrintedWordText = () => domElements.wordDisplayArea.innerHTML;
const getPrintedWordColor = () => domElements.wordDisplayArea.style.color;
const isPrintedWordMatching = () => getPrintedWordText() === getPrintedWordColor();
const getQuantityFieldValue = () => domElements.formElements.stimulusNumberField.value;

/** Checks if user wants to evaluate word meaning or word color */
function getRadioButtonChoice () {
    const { wordMeaningRadioButton, wordColorRadioButton } = domElements.formElements;
    
    let generationFunction;
    
    if (wordMeaningRadioButton.checked) {
        generationFunction = getPrintedWordText;
    } else if (wordColorRadioButton.checked) {
        generationFunction = getPrintedWordColor;
    }

    return generationFunction;
}

/** Turns choice button gray for 0.2 seconds after numpad button press */
function indicateButtonChoice (button$) {
    button$.style.backgroundColor = "#BFBFBF";
    setTimeout( function () {
        button$.style.backgroundColor = "whitesmoke"
    }, 200 );
}

function addEventListenersToNumpadKeys () {
    document.addEventListener('keydown', (event) => {
        const { redChoice, greenChoice, blueChoice } = domElements.buttons;
        
        switch (event.key) {
            case "1":
                handleColorButtonClick(redChoice);
                indicateButtonChoice(redChoice);
                break;
            case "2":
                handleColorButtonClick(greenChoice);
                indicateButtonChoice(greenChoice);
                break;
            case "3":
                handleColorButtonClick(blueChoice);
                indicateButtonChoice(blueChoice);
                break;
        }
    });
}

function handleMatchScenario () {
    matchingCounter++;
    matchedTimes.push( timeFunctions.logTime() );
}

function handleMismatchScenario () {
    mismatchedCounter++;
    mismatchedTimes.push( timeFunctions.logTime() );
}

const handleCorrectButtonAnswer = () => isPrintedWordMatching() ? handleMatchScenario() : handleMismatchScenario();
const handleIncorrectButtonAnswer = () => incorrectCounter++;

/** Checks if user's answer was correct */
function handleButtonAnswer ( button$ ) {
    getButtonText( button$ ) === evaluatingMeaningOrColor() ? handleCorrectButtonAnswer() : handleIncorrectButtonAnswer();
}

/** Randomly generates a matching or mismatched word-color pair and displays it */
function displayNewPrintedWord () {
    const { wordDisplayArea } = domElements;
    
    let generationFunction;

    if ( matchingCounter >= numberOfWords && mismatchedCounter < numberOfWords ) {
        generationFunction = generateMismatchedWordAndColor;
    } else if ( mismatchedCounter >= numberOfWords && matchingCounter < numberOfWords ) {
        generationFunction = generateMatchingWordAndColor;
    } else {
        generationFunction = Math.round( Math.random() ) === 0 ? generateMismatchedWordAndColor : generateMatchingWordAndColor;
    }

    const pair = generationFunction();
    wordDisplayArea.innerHTML = pair[0];
    wordDisplayArea.style.color = pair[1];
}

function displayNewWordAndRestartTimer () {
    displayNewPrintedWord();
    timeFunctions.restartTimer();
}

/** Validates number input, hides start button, shows color buttons, displays printed word and (re)starts timer */
function handleStartClick () {
    if (getQuantityFieldValue() < 1 || isNaN( getQuantityFieldValue() )) {
        alert("Number must be higher than 0")
        return;
    } 

    numberOfWords = getQuantityFieldValue();
    evaluatingMeaningOrColor = getRadioButtonChoice();
    
    const {
        form,
        buttons: {
            start,
            redChoice,
            greenChoice,
            blueChoice,
        }
    } = domElements;

    toggleDomElementsDisplay([ form, start, redChoice, greenChoice, blueChoice ]);
    domElements.containers.starting.remove();

    addEventListenersToNumpadKeys();

    displayNewWordAndRestartTimer();
}

function handleColorButtonClick ( buttonClicked$ ) {
    handleButtonAnswer( buttonClicked$ );
    displayNewWordAndRestartTimer();
    tryEndTest();
    logInfo();
}

/** Logs reaction times and number of words in the console */
function logInfo () {
    console.clear();
    console.log('Matched times', matchedTimes);
    console.log('Mismatched times', mismatchedTimes);
    console.log('Matches', matchingCounter);
    console.log('Mismatches', mismatchedCounter);
}

/** Removes test container with choice buttons and displays end information counters */
function endTest () {
    const {
        wordDisplayArea,
        containers: {
            result,
        },
        buttons: {
            redChoice,
            greenChoice,
            blueChoice
        }
    } = domElements;

    toggleDomElementsDisplay([ wordDisplayArea, result, redChoice, greenChoice, blueChoice ]);
    domElements.containers.test.remove();

    addEndTestCounters();

    createFile();
}

/** Checks if word limit has been reached */
function tryEndTest () {
    if ( matchingCounter >= numberOfWords && mismatchedCounter >= numberOfWords ) {
        endTest();
    }
}

/** Displays matching & mismatched time averages and incorrect counter */
function addEndTestCounters () {
    const averageTimeMatching = ( sumOfArray(matchedTimes) / matchedTimes.length ).toFixed(5);
    const averageTimeMismatched = ( sumOfArray(mismatchedTimes) / mismatchedTimes.length ).toFixed(5);

    domElements.timeDivs.matched.innerHTML = averageTimeMatching;
    domElements.timeDivs.mismatched.innerHTML = averageTimeMismatched;
    domElements.incorrectDiv.innerHTML = incorrectCounter;
}

/** Adds event handlers to buttons */
function init () {
    addEventListenersToInformationIcon();
    const { start, redChoice, greenChoice, blueChoice } = domElements.buttons;
    start.addEventListener( "click", () => handleStartClick() );
    redChoice.addEventListener( "click", () => handleColorButtonClick( redChoice ) );
    greenChoice.addEventListener( "click", () => handleColorButtonClick( greenChoice ) );
    blueChoice.addEventListener( "click", () => handleColorButtonClick( blueChoice ) );
}

init();