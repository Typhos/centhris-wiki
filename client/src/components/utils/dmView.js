import Accountability from 'components/accountability';

export default class dmView {

  constructor () {
    this.keySequence = [];
    this.failTest = {};
  }

  static accountability() {

    if ( localStorage.getItem('dmView') === "true" ) {
      console.info(
        '%c You are currently in the Dungeon Master view. All content is linked, even if players cannot see it. \n To revert to standard view, clear the dmView property in your localStorage.',
        'background: #222; color: #bada55; line-height: 20px; padding: 1.5em 25px;'
      );
  
      Accountability();
    }

  }

  keyPress (key) {
    this.keySequence.push(key);
    this.checkKeyCode();
  }

  checkKeyCode() {
    const dmCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"];

    try {
      this.keySequence.forEach( (key,i) => {  
        if ( i >= dmCode.length - 1 ) {
          let dmView = localStorage.getItem('dmView') === 'true';
          localStorage.setItem('dmView', !dmView);
          window.location.reload();
        } else if ( dmCode[i] !== this.keySequence[i] ) {
          throw this.failTest;
        }
  
      });
    } catch (e) {
      this.keySequence = [];
      if (e !== this.failTest) throw e;
    }
  
  }
}

