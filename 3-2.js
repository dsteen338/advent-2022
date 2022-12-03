const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const getRucksacks = async () => {
  const data = await readFile("input.txt", "utf8");
  return data
    .split("\n")
    .map((line) => line.split('').map(getPriority))
    .filter((line) => !!line);
};

const asciiModulo = 32;
const isLower = (char) => char === char.toLowerCase();

const getPriority = (char) => { 
    const asciiVal = char.charCodeAt(0) % asciiModulo;
    return isLower(char) ? asciiVal : asciiVal + 26;
}

const chunk3 = (arr) => arr.reduce((acc, curr, index) => { 
    const chunkIndex = Math.floor(index/3)
  
    if(!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
  
    acc[chunkIndex].push(curr)
  
    return acc
  }, [])

const intersect = (first, second) => first.filter(value => second.includes(value))

async function main() {
  const allRucksacks = await getRucksacks();

  const groups = chunk3(allRucksacks);

  const duplicates = groups.map(([first, second, third]) => intersect(intersect(first, second), third)[0]);
 
  console.log(duplicates.reduce((acc, curr) => acc + curr));
}

main();
