/*
  each entry has a key of the form 'x,y' representing a single square 
  in the chess board and its value is the valid positions a knight 
  can move to from that position. x,y values are in range 0 to 7
*/
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

/*
  We need a simple way to get the value at a certain key, since the key is a string 
  in the form of 'x,y', and our main function will use a literal array ([x,y]) to specify 
  start and end positions
*/
function getValue(array) {
  let [x, y] = array;
  let key = `${x},${y}`;
  return graph[key];
}

let graph = createAdjacencyList();
console.log(graph);
