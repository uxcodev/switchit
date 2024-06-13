


const bitwiseEncode = (arr) => {
  let num = 0;
  arr.forEach((value) => {
    // Calculate the position of the bit (log base 2 of the value)
    let bitPosition = Math.log2(value);
    // Set the corresponding bit
    num |= (1 << bitPosition);
  });
  // Add 1 to the result to match the decode function's expectations
  return num + 1;
}

const bitwiseDecode = (num) => {
  num--;
  let arr = [];
  let i = 0;
  while (num > 0) {
    if (num & 1) // If the last bit is set
      arr.push(2 ** i); // This is the same as Math.pow(2, i)
    i++;
    num = num >> 1; // Right shift to check the next bit
  }
  return arr;
}

export default { bitwiseEncode, bitwiseDecode };