
class Validator {
  #input;
  #delimiter = [',', ':'];

  constructor(input) {
    this.#input = input;
  }

  validate() {
    this.#validateStringFormat();
    this.#validateNothingCustomDelimiter();
  }

  #validateStringFormat() {
    
  }

  #validateNothingCustomDelimiter() {
    if (this.#input) {
      
    }
  }

}

export default Validator;
