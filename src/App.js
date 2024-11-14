import Controller from './controller/Controller.js';

class App {
  async run() {
    new Controller().start();
  }
}

export default App;
