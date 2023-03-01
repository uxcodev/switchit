export default {
  getLeads() {
    // Function to generate a random number between min and max (inclusive)
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to generate a random boolean value
    function getRandomBoolean() {
      return Math.random() < 0.5;
    }

    // Function to generate a random object for the access property
    function getRandomAccess() {
      return {
        mortgage: { status: getRandomBoolean(), preferences: { test: 1 } },
        insurance: { status: getRandomBoolean(), preferences: { test: 1 } },
        banking: { status: getRandomBoolean(), preferences: { test: 1 } },
        broadband: { status: getRandomBoolean(), preferences: { test: 1 } },
        mobile: { status: getRandomBoolean(), preferences: { test: 1 } },
        utilities: { status: getRandomBoolean(), preferences: { test: 1 } },
        auto: { status: getRandomBoolean(), preferences: { test: 1 } }
      };
    }

    // Generate the array of 50 objects
    let array = [];
    for (let i = 0; i < 50; i++) {
      let obj = {
        userId: getRandomNumber(100000, 999999),
        match: getRandomNumber(30, 99),
        value: getRandomNumber(5, 4000),
        // selected: false,
        access: getRandomAccess()
      };
      array.push(obj);
    }

    // console.log(array); // Print the array to the console
    return array
  }
}
