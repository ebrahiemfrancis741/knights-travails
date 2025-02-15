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
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      let key = `${j},${i}`;
      adjacencyList[key] = [];
      for (let k = 0; k < moves.length; k++) {
        let x = j + moves[k][0];
        let y = i + moves[k][1];
        if (x < 0 || x > 7 || y < 0 || y > 7) {
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

/*
  Converts a 'x,y' key to [x,y] array
*/
function convertToArray(key) {
  let values = key.split(",");
  let x = parseInt(values[0]);
  let y = parseInt(values[1]);
  return [x, y];
}

function convertToKey(array){
  let [x, y] = array;
  let key = `${x},${y}`;
  return key;
}

let graph = createAdjacencyList();

function solve(start) {
  let queue = [start];
  let visited = {};
  let prev = {};

  for (let key in graph) {
    visited[key] = false;
    prev[key] = null;
  }

  visited[start] = true;

  while (queue.length > 0) {
    let node = queue.shift();
    let neighbors = graph[node];

    for (let neighbor of neighbors) {
      let neighborKey = convertToKey(neighbor);
      if (!visited[neighborKey]) {
        queue.push(neighborKey);
        visited[neighborKey] = true;
        prev[neighborKey] = node;
      }
    }
  }

  return prev;
}

function reconstructPath(start, end, prev) {
  let path = [];
  for (let at = end; at != null; at = prev[at]) {
    path.push(convertToArray(at));
  }
  path.reverse();

  if (path[0].toString() === convertToArray(start).toString()) {
    return path;
  }
  return [];
}

function knightMoves(start, end) {
  start = convertToKey(start);
  end = convertToKey(end);

  let prev = solve(start);

  return reconstructPath(start, end, prev);
}

console.log(knightMoves([3, 3], [4, 3])); // Should find the shortest path from [3, 3] to [4, 3]