class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) { 
    let results = [];
    for (let command of message.commands) {

      if (command.commandType === 'STATUS_CHECK') {
        let roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position  
        };
        results.push({completed:true, roverStatus});
      }

      else if (command.commandType === 'MODE_CHANGE') {
        if (command.value === 'LOW_POWER') {
          this.mode = 'LOW_POWER';
          results.push({completed: true});
        }
        else if (command.value === 'NORMAL') {
          this.mode = 'NORMAL';
          results.push({completed: true})
        }
      }
        
      else if (command.commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          results.push({completed: false});
        }
        else {
          this.position = command.value;
          results.push({completed: true});
        }
      }

      else {
        results.push({completed: false, error: 'Unknown Command'});
      };

    };

    return {
      message: message.name,
      results: results
    };
  };
};

module.exports = Rover;