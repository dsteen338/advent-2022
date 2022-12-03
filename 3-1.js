const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const getRucksacks = async () => {
  const data = await readFile("input.txt", "utf8");
  return data
    .split("\n")
    .map((line) => {
      const half = line.length/2;
      return [line.slice(0, half), line.slice(half, line.length)].map(str => str.split('').map(getPriority))
    })
    .filter((line) => !!line);
};

const asciiModulo = 32;
const isLower = (char) => char === char.toLowerCase();

const getPriority = (char) => { 
    const asciiVal = char.charCodeAt(0) % asciiModulo;
    return isLower(char) ? asciiVal : asciiVal + 26;
}

async function main() {
  const allRucksacks = await getRucksacks();

  const duplicates = allRucksacks.map(([fistPocket, secondPocket]) => fistPocket.find(value => secondPocket.includes(value)));
 
  console.log(duplicates.reduce((acc, curr) => acc + curr));
}

main();
