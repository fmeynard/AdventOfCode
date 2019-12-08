const fs = require('fs');


let xxx = (input) => {
  const orbits = input
    .split('\n')
    .reduce((orbits, line) => {
      const [object1, object2] = line.trim().split(')');

      orbits[object2] = object1;

      return orbits;
    }, {});

  const distances = {};

  let objectsOrbitingAnother = Object.keys(orbits);

  for (let i = 0; i < objectsOrbitingAnother.length; i++) {
    const currentObject = objectsOrbitingAnother[i];
    const visited = [];

    let nextObject = orbits[currentObject];
    let distanceToObject = 0;

    while (nextObject) {
      nextObject = orbits[nextObject];
      distanceToObject += 1;

      visited.push([ nextObject, distanceToObject ]);
    }

    distances[currentObject] = visited;
  }

  const closestCommonObject1 = distances['YOU']
    .filter(([ object ]) => distances['SAN'].find(([ otherObject ]) => object === otherObject))
    .sort((a, b) => a[1] - b[1])[0];

  const closestCommonObject2 = distances['SAN']
    .find(([object]) => object === closestCommonObject1[0]);

  console.log({ closestCommonObject1, closestCommonObject2});

  return closestCommonObject1[1] + closestCommonObject2[1];
};

console.log(xxx(fs.readFileSync('./inputs/p6.txt', 'utf-8')));