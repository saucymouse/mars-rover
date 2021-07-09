const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');
const Rover = require('../rover.js');

describe('Rover class', () => {

  //TEST 7
  it('constructor sets position and default values for mode and generatorWatts', () => {
    let rover = new Rover(98382);
    assert.strictEqual(rover.position, 98382);
    assert.strictEqual(rover.mode, 'NORMAL');
    assert.strictEqual(rover.generatorWatts, 110);
  });

  //TEST 8
  it('response returned by receiveMessage contains name of message', () => {
    let rover = new Rover(98382);
    let message = new Message('Test message with name', 'commands');
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.message, 'Test message with name');
  });

  //TEST 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });

  //TEST 10
  it('responds correctly to status check command', () => {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with status check', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].roverStatus.mode, 'NORMAL');
    assert.strictEqual(response.results[0].roverStatus.generatorWatts, 110);
    assert.strictEqual(response.results[0].roverStatus.position, 98382);
  });

  //TEST 11
  it('responds correctly to mode change command', () => {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with mode change', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].completed, true);
    assert.strictEqual(rover.mode, 'NORMAL');
  });

  //TEST 12
  it('responds with false completed value when attempting to move in LOW_POWER mode', () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let message = new Message('Test mesage with move command on LOW_POWER', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.position, 98382);
    assert.strictEqual(response.results[1].completed, false);
  });

  //TEST 13
  it('responds with position for MOVE command', () => {
    let commands = [new Command('MOVE', 12345)];
    let message = new Message('Test message with MOVE command', commands);
    let rover = new Rover(98382);
    rover.receiveMessage(message);
    assert.strictEqual(rover.position, 12345);
  });

  //TEST 14
  it('completed false and a message for an unknown command', () => {
    let commands = [new Command('ur stupid')];
    let message = new Message('Test message telling the Rover it is stupid', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].completed, false);
    assert.strictEqual(response.results[0].error, 'Unknown Command');
  });

});

