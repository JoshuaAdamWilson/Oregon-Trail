/**
 * Oregon Trail -----------------------------------------------------------
 */

// Create your Classes here.

/*
function Traveler(n) {
  this.name = n;
  this.food = 1;
  this.isHealthy = true;
}

Traveler.prototype = {
  constructor: Traveler,
  hunt: function () {
    // Increase the traveler's food by 2.
    this.food += 2;
  },
  eat: function () {
    // Consumes 1 unit of the traveler's food. If the traveler doesn't have any food to eat, the traveler is no longer healthy.
    if (this.food === 0) {
      this.isHealthy = false;
    }
    if (this.food >= 1) {
      this.food -= 1;
    }
  },
};
*/

class Traveler {
  constructor (n) {
    this.name = n
    this.food = 1
    this.isHealthy = true
  }
  hunt() {
    this.food += 2
  }
  eat() {
    if (this.food === 0) {
      this.isHealthy = false;
    }
    if (this.food >= 1) {
      this.food -= 1;
    }
  }
}

/*
function Doctor(name) {
  Traveler.call(this, name);
}

Doctor.prototype = Object.create(Traveler.prototype)
Doctor.prototype.contructor = Doctor
Doctor.prototype.heal = function (Traveler) {
  Traveler.isHealthy = true
}
*/

class Doctor extends Traveler{
  constructor (name) {
    super(name, "Doctor");
  }
  heal(Traveler) {
    Traveler.isHealthy = true
  }
} 

/*
function Hunter(name) {
  Traveler.call(this, name);
  this.food = 2;
}

Hunter.prototype = Object.create(Traveler.prototype)
Hunter.prototype.contructor = Hunter
Hunter.prototype.hunt = function () {
  this.food +=5
}

Hunter.prototype.eat = function () {
    if (this.food >= 1) {
      this.food -= 2;
    }
    if (this.food === -1) {
      this.food = 0
    }
    if (this.food === 0) {
      this.isHealthy = false;
    }
}

Hunter.prototype.giveFood = function (Traveler, num) {
  this.food -= num
  Traveler.food += num
}
*/

class Hunter extends Traveler {
  constructor (name) {
    super(name, "Hunter")
    this.food = 2
  }
  hunt() {
    this.food +=5
  }
  eat () {
    if (this.food >= 1) {
      this.food -= 2;
    }
    if (this.food === -1) {
      this.food = 0
    }
    if (this.food === 0) {
      this.isHealthy = false;
    }
  }
  giveFood(Traveler, num) {
    this.food -= num
    Traveler.food += num
  }
}
/*
function Wagon(capacity, passengers) {
  this.capacity = 4;
  this.passengers = [];
}

Wagon.prototype = {
  contructor: Wagon,
  getAvailableSeatCount: function () {
    // Return the number of empty seats, determined by the capacity set when the wagon was created, compared to the number of passengers currently on board.
    return this.capacity;
  },
  join: function (Traveler) {
    // Add the traveler to the wagon if there is space. If the wagon is already at maximum capacity, don't add them.
    if (this.capacity === 0) {
      return;
    }
    this.capacity--;
    this.passengers.push(Traveler);
  },
  shouldQuarantine: function () {
    // Return true if there is at least one unhealthy person in the wagon. Return false if not.
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].isHealthy === false) {
        return true;
      }
    }
    return false;
  },
  totalFood: function () {
    //Return the total amount of food among all occupants of the wagon.
    let allFood = 0;
    for (let i = 0; i < this.passengers.length; i++) {
      allFood += this.passengers[i].food;
    }
    return allFood;
  },
};
*/
 
class Wagon {
  constructor () {
    this.capacity = 4;
    this.passengers = [];
  }
  getAvailableSeatCount() {
    return this.capacity
  }
  join(Traveler) {
    if (this.capacity === 0) {
      return;
    }
    this.capacity--;
    this.passengers.push(Traveler);
  }
  shouldQuarantine() {
    for (let i = 0; i < this.passengers.length; i++) {
      if (this.passengers[i].isHealthy === false) {
        return true;
      }
    }
    return false;
  }
  totalFood() {
    let allFood = 0;
    for (let i = 0; i < this.passengers.length; i++) {
      allFood += this.passengers[i].food;
    }
    return allFood;
  }
}

/**
 * TESTS -----------------------------------------------------------
 * Do not modify these, but use them to verify that your code works.
 */

// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let drsmith = new Doctor("Dr. Smith");
let sarahunter = new Hunter("Sara");
let maude = new Traveler("Maude");
console.log(
  `#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
wagon.join(henrietta);
console.log(
  `#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(
  `#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`
);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(
  `#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(
  `#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`
);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(
  `#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`
);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);

