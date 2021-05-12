import { domElements } from './dom-elements.js';

const MAX_CHARACTERS = 4;
const ERROR_MESSAGE_TIME_MS = 3000;

const errorContainer$ = domElements.containers.error;
const numberField$ = domElements.formElements.stimulusNumberField;
const errorMessage$ = domElements.errorMessage;
const errorSound$ = domElements.errorSound;

const limitFieldLength = (field$) => field$.value = field$.value.substr(0, MAX_CHARACTERS);
const setErrorMessage = (text) => errorMessage$.innerHTML = text;
const addNoVisibilityClassToErrorContainer = () => errorContainer$.classList.add('no-visibility');
const removeNoVisibilityClassFromErrorContainer = () => errorContainer$.classList.remove('no-visibility');
const isNumberFieldAboveCharacterLimit = () => numberField$.value.length > MAX_CHARACTERS;
const playErrorSound = () => errorSound$.play();

const addNumberFieldCharacterLimitListeners = (chosenEvent) => {
    document.body.addEventListener(chosenEvent, function () {
        if ( !isNumberFieldAboveCharacterLimit() ) return;
        
        limitFieldLength(numberField$);

        setErrorMessage(`Quantity field can only contain ${MAX_CHARACTERS} characters`);
        playErrorSound();
        removeNoVisibilityClassFromErrorContainer();

        setTimeout(addNoVisibilityClassToErrorContainer, ERROR_MESSAGE_TIME_MS);
    }, true);
}

addNumberFieldCharacterLimitListeners("mouseup");
addNumberFieldCharacterLimitListeners("keyup");