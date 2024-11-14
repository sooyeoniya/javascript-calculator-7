import InputView from '../view/InputView.js';

class Controller {
  async start() {
    const input = await InputView.readString();
    
  }
}

export default Controller;
