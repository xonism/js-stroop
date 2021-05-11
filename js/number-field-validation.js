import { domElements } from './dom-elements.js';

const numberField$ = domElements.formElements.stimulusNumberField;

function limit (element$) {
    const MAX_CHARACTERS = 4;
    if (element$.value.length > MAX_CHARACTERS) element$.value = element$.value.substr(0, MAX_CHARACTERS);
}

const callLimitFunctionWithNumberField = () => limit(numberField$);

document.body.addEventListener("keyup", callLimitFunctionWithNumberField, true);
document.body.addEventListener("mouseup", callLimitFunctionWithNumberField, true);