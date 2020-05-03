
const Car = require('./car.js');

/**
 * @description a base class for Parking
 */

class Parking {

	constructor () {
        this.max_parking_slots = 0; // maximum parking slots allowed
        this.parking_slots = []; // array for parking slots
		this.parking_car_numbers = []; // array for checking duplicate
    }

	/**
	 *
	 * @param {String} input from input files, number of slots that will be created
	 * @description creates a parking lot with given maximum slot numbers.
	 * It throws an error if zero or negative input is provided
	 */
	createParkingLot (input) {
		this.max_parking_slots = parseInt(input.split(' ')[1]);
		if (this.max_parking_slots <= 0) {
			// minimum: 1 slot
			throw new Error('Minimum one slot is required to create parking slot');
		}
        for (let i = 0; i < this.max_parking_slots; i++) {
            this.parking_slots.push(null);
        }
        return this.max_parking_slots;
	}

	/**
	 *
	 * @param {String} input from input files, with registration car number (car_number) is required
	 * @description allocates nearest slot number to incoming cars.
	 * It throws an error if parking lot is empty or full.
	 * It also throws an error if only one field (either registration car number) is provided.
	 */
    parkCar (input) {
    	if (this.max_parking_slots > 0) {
	    	if (this.findNearestAvailableSlot(this.parking_slots) === true) {
		  		for (let i = 0; i < this.parking_slots.length; i++) {
		  			if (this.parking_slots[i] === null) {
						const car_number = input.split(' ')[1];
						if (car_number) {
							if (this.parking_car_numbers.includes(car_number)) {
								throw new Error('Duplicate registration car number');
							}
							this.parking_slots[i] = new Car(car_number);
							this.parking_car_numbers.push(car_number)
							i = i + 1;
							return i;
						}
						else {
							throw new Error('Please provide registration number');
						}
		  			}
		  		}
			  }
			else {
		  		throw new Error('Sorry, parking lot is full');
		  	}
          }
          else {
	  		throw new Error('Minimum one slot is required to create parking slot');
	  	}
	}

	/**
	 * @description Returns an array containing parking details i.e. slot no, registration number
	 */
    getParkingStatus () {
    	let arr = [];
    	if (this.max_parking_slots > 0) {
			arr.push('Slot No. Registration No.');
        	for (let i = 0; i < this.parking_slots.length; i++) {
        		if (this.parking_slots[i] != null) {
        			const e = i + 1;
        			arr.push(e + '.  ' + this.parking_slots[i].number);
        		}
        	}
        	return arr;
		}
		else {
			throw new Error('Sorry, parking lot is empty');
		}
	}
	/**
	 *
	 * @param {String} input from input files, car_number and hour is required
	 * @description it makes the slot free for the car of given registration number.
	 * It throws an error if car is not found.
	 */
	leaveCarByCarNumberAndCalPrice (input) {
		const return_params = {};
		if (this.max_parking_slots > 0) {
			let price;
			const car_number = input.split(' ')[1];
			const hour = parseInt(input.split(' ')[2]);
			if (hour <= 2 && hour >= 0) {
				price = 10 // $10 for first 2 hours.
			} else {
				price = 10 + 10*(hour - 2) // $10 for every additional hour.
			}
			for (let index = 0; index < this.max_parking_slots; index++) {
				if (this.parking_slots[index].number === car_number) {
					this.parking_slots[index] = null;
					return_params["index"] =  index + 1;
					return_params["car_number"] = car_number;
					return_params["price"] = price;
					return return_params
				}
			}
		}
		else {
			throw new Error('Sorry, car with given registration is not found');
		}
	}
	/**
	 * @description returns the nearest available slot
	 */
	findNearestAvailableSlot () {
		let ele = false;
		for (let i = 0; i < this.parking_slots.length; i++) {
			if (this.parking_slots[i] == null) {
				ele = true;
			}
		}
		return ele;
	}
}

module.exports = Parking;
