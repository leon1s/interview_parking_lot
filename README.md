

## Problem Statement
I own a parking lot that can hold up to 'n' cars at any given point in time. 
Each slot is given a number starting at 1 increasing with increasing distance from the entry point in steps of one. I want to create an automated ticketing system that allows my customers to use my parking lot without human intervention.
When a car enters my parking lot, I want to have a ticket issued to the driver. 
The ticket issuing process includes us documenting the registration number (number plate) and the colour of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver (we assume that our customers are nice enough to always park in the slots allocated to them). The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket with the time the car was parked in the lot, which then marks the slot they were using as being available. Total parking charge should be calculated as per the parking time. Charge applicable is $10 for first 2 hours and $10 for every additional hour.
We interact with the system via a simple set of commands which produce a specific output. Please take a look at the example below, which includes all the commands
you need to support - they're self explanatory. The system should accept a filename as a parameter at the command prompt and read the commands from that file.

---

## Commands accepted

1. Create parking lot of size n: create_parking_lot {capacity}
2. Park a car: park {car_number}
3. Remove (Unpark) car from : leave {car_number} {hours}
4. Print status of parking slot: status

Note: we only support input from a text file.
---

## How to run

- To install all dependencies, compile and run tests:
    - $sh bin/setup.sh.
- To run the code so it accepts input from a file:
    - $sh bin/parking_lot.sh file_inputs.txt.
    
Note: Input text files must be put in bin
---

## Functional test
- Test case run by mocha.
- Resource should be put it "tests/resource"

## Sample
bin % sh parking_lot.sh test1.txt
Created a parking lot with 8 slots.
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Allocated slot number: 4
Allocated slot number: 5
Allocated slot number: 6
Allocated slot number: 7
Allocated slot number: 8
Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30
Registration number KA-01-HH-7777 with Slot Number 4 is free with Charge 50
Registration number KA-02-HH-7777 is not found
Slot No. Registration No.
1.  KA-01-HH-1234
2.  KA-01-HH-9999
3.  KA-01-BB-0001
5.  KA-01-HH-2701
7.  KA-01-NN-3141
8.  KA-04-HH-8141
Allocated slot number: 4
Allocated slot number: 6
Sorry, parking lot is full
Slot No. Registration No.
1.  KA-01-HH-1234
2.  KA-01-HH-9999
3.  KA-01-BB-0001
4.  KA-01-P-3333
5.  KA-01-HH-2701
6.  DL-12-AA-9999
7.  KA-01-NN-3141
8.  KA-04-HH-8141


