const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const getCalories = async () => {
  const data = await readFile("input.txt", "utf8");
  return data
    .split("\n\n")
    .map((line) => line.split("\n").map((num) => +num))
    .filter((line) => !!line);
};

async function main() {
  const allCalories = await getCalories();

  const summedCalories = allCalories.map((elvesCalories) =>
    elvesCalories.reduce((acc, curr) => acc + curr)
  );

  const topThreeElves = summedCalories.sort((a, b) => b - a).slice(0, 3);

  console.log(topThreeElves.reduce((acc, curr) => acc + curr));
}

main();
