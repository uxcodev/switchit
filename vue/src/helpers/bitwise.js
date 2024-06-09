
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

export default bitwiseDecode;

