
function createAdjacencyList() {
  let moves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  let adjacencyList = [];
  // yes... tripple loop is terrible...
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      let key = `${j},${i}`;
      adjacencyList[key] = [];
      for (let k = 0; k < moves.length; k++) {
        // test to see if a move would be valid from this position
        let x = j + moves[k][0];
        let y = i + moves[k][1];
        if (x < 0 || x > 7 || y < 0 || y > 7) {
          // invalid index results
          continue;
        }
        adjacencyList[key].push([x, y]);
      }
    }
  }
  return adjacencyList;
}

let graph = createAdjacencyList();
console.log(graph);
