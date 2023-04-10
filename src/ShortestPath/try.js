const fs = require("fs");
let inputfile="test/astar2.txt"
// const kata=""

function parseInput(inputStr) {
    
    const lines = inputStr.trim().split('\n');
    const matrix = [];

    let n = lines[0].trim().split(' ').length
    for (let i = 0; i < n; i++) {
        const row = lines[i].trim().split(' ').map(Number);
        matrix.push(row);
    }
    const coordinates = [];
    for (let i = n+1; i < lines.length; i++) {
        const coord = lines[i].trim().split(' ').map(Number);
        coordinates.push(coord);
    }
    return {matrix, coordinates};
}
// console.log(parseInput(read("test/astar1.txt")))
// console.log(kata)

fs.readFile(inputfile, (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
    const kata=data.toString();
    console.log(parseInput(kata))
});