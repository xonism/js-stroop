import { domElements } from './dom-elements.js';

const MAX_CHARACTERS = 4;
const MIN_VALUE = 1;
const ERROR_MESSAGE_TIME_MS = 3000;

const errorContainer$ = domElements.containers.error;
const numberField$ = domElements.formElements.stimulusNumberField;
const errorMessage$ = domElements.errorMessage;
const errorSound$ = domElements.errorSound;

const isNumberFieldAboveCharacterLimit = () => numberField$.value.length > MAX_CHARACTERS;
const isNumberFieldBelowAllowedValue = () => numberField$.value < MIN_VALUE;

const setFieldValue = (field$) => field$.value = MIN_VALUE;
const setErrorMessage = (text) => errorMessage$.innerHTML = text;

const addNoVisibilityClassToErrorContainer = () => errorContainer$.classList.add('no-visibility');
const removeNoVisibilityClassFromErrorContainer = () => errorContainer$.classList.remove('no-visibility');

const limitFieldLength = (field$) => field$.value = field$.value.substr(0, MAX_CHARACTERS);
const playErrorSound = () => errorSound$.play();

const addNumberFieldAllowedValueListener = (chosenEvent) => {
    document.body.addEventListener(chosenEvent, function () {
        if ( !isNumberFieldBelowAllowedValue() ) return;
        
        setFieldValue(numberField$);

        setErrorMessage(`Quantity field can only contain values above or equal to ${MIN_VALUE}`);
        playErrorSound();
        removeNoVisibilityClassFromErrorContainer();

        setTimeout(addNoVisibilityClassToErrorContainer, ERROR_MESSAGE_TIME_MS);
    }, true);
};

const addNumberFieldCharacterLimitListener = (chosenEvent) => {
    document.body.addEventListener(chosenEvent, function () {
        if ( !isNumberFieldAboveCharacterLimit() ) return;
        
        limitFieldLength(numberField$);

        setErrorMessage(`Quantity field can only contain ${MAX_CHARACTERS} characters`);
        playErrorSound();
        removeNoVisibilityClassFromErrorContainer();

        setTimeout(addNoVisibilityClassToErrorContainer, ERROR_MESSAGE_TIME_MS);
    }, true);
};

addNumberFieldCharacterLimitListener("mouseup");
addNumberFieldCharacterLimitListener("keyup");

addNumberFieldAllowedValueListener("mouseup");
addNumberFieldAllowedValueListener("keyup");