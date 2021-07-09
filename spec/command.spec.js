const assert = require('assert');
const Command = require('../command.js');

describe("Command class", () => {

  //TEST 1
  it("throws error if command type is NOT passed into constructor as the first parameter", () => {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

  //TEST 2
  it("constructor sets command type", () => {
    let myCommand = new Command('command type');
    assert.strictEqual(myCommand.commandType, 'command type');
  });

  //TEST 3
  it('constructor sets a value passed in as the 2nd argument', () => {
    let myCommand = new Command('command type', 12345);
    assert.strictEqual(myCommand.value, 12345);
  });

});