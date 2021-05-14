import { domElements } from './dom-elements.js';

const MAX_CHARACTERS = 4;
const MIN_VALUE = 1;
const ERROR_MESSAGE_TIME_MS = 3000;

const errorContainer$ = domElements.containers.error;
const numberField$ = domElements.formElements.stimulusNumberField;

const isNumberFieldAboveCharacterLimit = () => numberField$.value.length > MAX_CHARACTERS;
const isNumberFieldBelowAllowedValue = () => numberField$.value < MIN_VALUE;

const setFieldValue = (field$) => field$.value = MIN_VALUE;
const setErrorMessage = (text) => domElements.errorMessage.innerHTML = text;

const addErrorContainerNoVisibilityClass = () => errorContainer$.classList.add('no-visibility');
const removeErrorContainerNoVisibilityClass = () => errorContainer$.classList.remove('no-visibility');

const limitFieldLength = (field$) => field$.value = field$.value.substr(0, MAX_CHARACTERS);
const playErrorSound = () => domElements.errorSound.play();

const addErrorContainerFadeOutAnimation = () => errorContainer$.classList.add('fade-out-animation');
const removeErrorContainerFadeOutAnimation = () => errorContainer$.classList.remove('fade-out-animation');

function addErrorContainerFadeOutAndNoVisibility () {
    addErrorContainerFadeOutAnimation();
    setTimeout(removeErrorContainerFadeOutAnimation, 475);
    setTimeout(addErrorContainerNoVisibilityClass, 475);
}

const addNumberFieldAllowedValueListener = (chosenEvent) => {
    document.body.addEventListener(chosenEvent, function () {
        if ( !isNumberFieldBelowAllowedValue() ) return;
        setFieldValue(numberField$);
        setErrorMessage(`Quantity field can only contain values above or equal to ${MIN_VALUE}`);

        playErrorSound();
        removeErrorContainerNoVisibilityClass();
        setTimeout(addErrorContainerFadeOutAndNoVisibility, ERROR_MESSAGE_TIME_MS);
    }, true);
};

const addNumberFieldCharacterLimitListener = (chosenEvent) => {
    document.body.addEventListener(chosenEvent, function () {
        if ( !isNumberFieldAboveCharacterLimit() ) return;
        limitFieldLength(numberField$);
        setErrorMessage(`Quantity field can only contain ${MAX_CHARACTERS} characters`);

        playErrorSound();
        removeErrorContainerNoVisibilityClass();
        setTimeout(addErrorContainerFadeOutAndNoVisibility, ERROR_MESSAGE_TIME_MS);
    }, true);
};

addNumberFieldCharacterLimitListener("mouseup");
addNumberFieldCharacterLimitListener("keyup");

addNumberFieldAllowedValueListener("mouseup");
addNumberFieldAllowedValueListener("keyup");