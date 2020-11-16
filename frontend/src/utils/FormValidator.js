export default class FormValidator {
  constructor(validationSettings, formElement) {
    this.form = formElement;
    this.settings = validationSettings;
    this.inputs = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
    this.submitButton = this.form.querySelector(this.settings.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const displayError = this.form.querySelector(`#${this.settings.inputSelector.slice(1)}_${inputElement.name}_error`);
    displayError.textContent = errorMessage;
    displayError.classList.add(this.settings.errorClass);
  }

  _hideInputError(inputElement) {
    const displayError = this.form.querySelector(`#${this.settings.inputSelector.slice(1)}_${inputElement.name}_error`);
    displayError.classList.remove(this.settings.errorClass);
    displayError.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _isInvalidInputs() {
    return this.inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  submitButtonDisable(state) {
      this.submitButton.disabled = state;
  }

  _toggleSubmitState() {
    if (this._isInvalidInputs()) {
      this.submitButton.classList.add(this.settings.inactiveButtonClass);
      this.submitButtonDisable(true);
    } else {
      this.submitButton.classList.remove(this.settings.inactiveButtonClass);
      this.submitButtonDisable(false);
    }
  };

  _setEventListeners() {
    this.inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleSubmitState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  clearPopupForm() {
    this._toggleSubmitState();
    this.inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this.form.addEventListener('submit', (event) => { event.preventDefault(); });
    this._setEventListeners();
  }

}
