
const assert = require('chai').assert,
      fs = require('fs'),
      Parking = require('../parking_lot/models/parking');

let commands = [],
      total_parkings,
      parkingLot = new Parking();

// test specs for unit testing the methods in Parking Lot class
describe('Test for reading input test data', function () {
  it('reading input.txt', function (done) {
    fs.readFile('./tests/resource/unit_test_input.txt', 'utf-8', function (err, data) {
      if (err) {
        throw 'Unable to read input test file';
      }
      commands = JSON.parse(JSON.stringify(data)).split('\n');
      done();
    });
  });

  it('checking commands', function (done) {
      assert.equal(commands[0].split(' ')[0], 'create_parking_lot');
      assert.equal(commands[1].split(' ')[0], 'park');
      assert.equal(commands[7].split(' ')[0], 'leave');
      assert.equal(commands[8], 'status');
      done();
  });
});

// unit tests for functions in Parking class
describe('Testing Functions in Parking class', function () {

  it('Creating a Parking lot', function (done) {
      total_parkings = parkingLot.createParkingLot(commands[0]);
      assert.equal(total_parkings, 6);
      done();
  });

  it('Allocating Parking to car 1', function (done) {
      const ele = parkingLot.parkCar(commands[1]);
      assert.equal(ele, 1, 'these numbers are equal');
      done();
  });

  it('Allocating Parking to car 2', function (done) {
      const ele = parkingLot.parkCar(commands[2]);
      assert.equal(ele, 2);
      done();
  });

  it('Allocating Parking to car 3', function (done) {
      const ele = parkingLot.parkCar(commands[3]);
      assert.equal(ele, 3);
      done();
  });

  it('Allocating Parking to car 4', function (done) {
      const ele = parkingLot.parkCar(commands[4]);
      assert.equal(ele, 4);
      done();
  });

  it('Allocating Parking to car 5', function (done) {
      const ele = parkingLot.parkCar(commands[5]);
      assert.equal(ele, 5);
      done();
  });

  it('Allocating Parking to car 6', function (done) {
      const ele = parkingLot.parkCar(commands[6]);
      assert.equal(ele, 6);
      done();
  });

  it('Leaving from slot 6', function (done) {
      const ele = parkingLot.leaveCarByCarNumberAndCalPrice(commands[7]);
      assert.equal(ele["index"], 6);
      assert.equal(ele["price"], 30);
      assert.equal(ele["car_number"], "KA-01-HH-3141");
      done();
  });

  it('Checking status', function (done) {
      const ele = parkingLot.getParkingStatus();
      assert.equal(ele.length, 6);
      done();
  });

  it('Allocating Parking to car 7. Should Reallocate the nearest empty postion 6', function (done) {
      const ele = parkingLot.parkCar(commands[9]);
      assert.equal(ele, 6);
      assert.notEqual(ele, 7);
      done();
  });

  it('Allocating Parking to car 8. Should indicate Parking is full.', function (done) {
      assert.throws(function() { parkingLot.parkCar(commands[10]) }, Error, "Sorry, parking lot is full");
      done();
  });

});
