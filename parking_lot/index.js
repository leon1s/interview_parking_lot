#!/usr/bin/env node
const fs = require("fs"),
    chalk = require("chalk"),
	readLine = require("readline");

require("events").EventEmitter.defaultMaxListeners = 0; // to avoid memory leaks errors

const command_line_inputs = process.argv // processing command line inputs

const Parking = require("./models/parking"),
	parkingLot = new Parking();

/**
* @description This is our main function to read line by line cmd in txt file.
*/
if (command_line_inputs[command_line_inputs.length - 1].endsWith(".txt")) {
    fs.readFile(command_line_inputs[2], "utf-8", function (err, data) {
        if (err) {
            console.log("Error in reading file");
        }
        const arr = data.split("\n");
		for (let i = 0; i < arr.length; i++) {
			processUserCommands(arr[i]);
        }

        // returning to console once all the inputs are processed
        process.exit(1);
    });
}
else {
    console.log(chalk.red.bold("Input file is empty or unknown format"));
}

/**
 *
 * @param {String} input entered via input files
 * @description parse/read input files and execute command line
 * calls model parking & function of parking class based on commands
 */
function processUserCommands (input) {
	 const userCommand = input.split(" ")[0]
     let total_parking_slots, parking_slot_number, leave_information;

    switch (userCommand) {
        case "create_parking_lot":
            try {
                total_parking_slots = parkingLot.createParkingLot(input);
                console.log(chalk.green.bold("Created a parking lot with " + total_parking_slots + " slots."));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }

            break;
        case "park":
            try {
                parking_slot_number = parkingLot.parkCar(input);
                console.log(chalk.green("Allocated slot number: " + parking_slot_number));
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
        case "leave":
            try {
                leave_information = parkingLot.leaveCarByCarNumberAndCalPrice(input);
                console.log(chalk.blue("Registration number " + leave_information["car_number"] + " with Slot Number "
                    + leave_information["index"] + " is free " + "with Charge " + leave_information["price"])) ;
            }
            catch (err) {
                const car_number = input.split(' ')[1];
                const error_message = "Registration number " + car_number + " is not found"
                console.log(chalk.red(error_message));
            }
            break;
        case "status":
            try {
                const parkingSlotStatus = parkingLot.getParkingStatus();
                if (parkingSlotStatus.length > 1) {
                    console.log(chalk.yellow(parkingSlotStatus.join("\n")));
                }
                else {
                    console.log(chalk.red("Sorry, parking lot is empty"));
                }
            }
            catch (err) {
                console.log(chalk.red.bold(err.message));
            }
            break;
    }
}
