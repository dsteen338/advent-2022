const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const getRucksacks = async () => {
  const data = await readFile("input.txt", "utf8");
  return data
    .split("\n")
    .map((line) => line.slice(0, Math.floor(line.length/2)).map(chars => chars.split('').map(getPriority)))
    .filter((line) => !!line);
};

const asciiModulo = 32;
const isUpper = (char) => char === char.toLowerCase();

const getPriority = (char) => { 
    const asciiVal = char % asciiModulo;
    return isUpper ? asciiVal + 26 : asciiVal;
}

async function main() {
  const allRucksacks = await getRucksacks();

  const summedCalories = allCalories.map((elvesCalories) =>
    elvesCalories.reduce((acc, curr) => acc + curr)
  );

  const topThreeElves = summedCalories.sort((a, b) => b - a).slice(0, 3);

  console.log(topThreeElves.reduce((acc, curr) => acc + curr));
}

main();
