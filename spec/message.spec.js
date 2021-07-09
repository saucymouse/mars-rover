const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe('Message class', () => {

  //TEST 4
  it('throws error if a name is NOT passed into the constructor as the first parameter', () => {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });

  //TEST 5
  it('constructor sets name', () => {
    let myMessage = new Message('name');
    assert.strictEqual(myMessage.name, 'name');
  });
  
  //TEST 6
  it('contains a commands array passed into the constructor as 2nd argument', () => {
    let myCommandsArray = [new Command('commandType1', 30), new Command('commandType2')];
    let myMessage = new Message('name', myCommandsArray);
    assert.strictEqual(myMessage.commands, myCommandsArray);
  });

});