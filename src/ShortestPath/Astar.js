class PriorityQueue{
    constructor(){
        this.elements = [];
    }

    enqueue(element,priority){
        const newNode = {element,priority};
        let added = false;

        for(let i=0;i<this.elements.length;i++){
            if(priority < this.elements[i].priority){
                this.elements.splice(i,0,newNode);
                added = true;
                break;
            }
        }

        if(!added){
            this.elements.push(newNode);
        }
    }

    dequeue(){
        return this.elements.shift();
    }

    isEmpty(){
        return this.elements.length === 0;
    }
}

function distance(a,b,keterangan){

    // map biasa
    if(keterangan){
        return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
    }
    // map peta
    else{
        return distance_map(a[0],a[1],b[0],b[1])
    }
}

function distance_map(lat1, lon1, lat2, lon2) {
    const R = 6371000; // approximate radius of Earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance/1000;
  }

function aStar(fullGraph, start, finish, keterangan){
    let graph = fullGraph.matrix;
    let point = fullGraph.coordinates;
    const liveNode = new PriorityQueue()
    for(let i=0;i<graph.length;i++){
        for(let j=0;j<graph.length;j++){
            if(graph[i][j]!=0){
                graph[i][j] =distance(point[i],point[j],keterangan);
            }
        }
    }
    liveNode.enqueue([start],0)
    let pathTotal=null
    const weight = new Array(graph.length).fill(Infinity)
    weight[start] = 0
    if(start<0 || finish<0 || start>=graph.length || finish>=graph.length || point.length!==graph.length){
        pathTotal=null
        return {pathTotal,weight}
    }
    while(!liveNode.isEmpty()){
        // console.log(liveNode.elements)
        const current = liveNode.dequeue()
        if(current.element[0] === finish){
            pathTotal = current.element
            break;
        }

        for(let i=0;i<graph[current.element[0]].length;i++){
            if(graph[current.element[0]][i] !== 0){
                const newDistance = weight[current.element[0]] + graph[current.element[0]][i]
                // console.log(current.element[0],i) 
                if(newDistance < weight[i]){
                    const straightLineDistance = distance(point[i],point[finish],keterangan)
                    const totalDistance= newDistance + straightLineDistance
                    weight[i] = newDistance
                    const newNode= [i].concat(current.element)
                    liveNode.enqueue(newNode,totalDistance)
                }
            }
        }
    }   

    let distanceMinimum=weight[finish]
    return {pathTotal,distanceMinimum}
}
function parserInputA(inputStr,keterangan) {
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
    for(let i=0;i<coordinates.length;i++){
        for(let j=0;j<coordinates.length;j++){
            if(matrix[i][j]!=0){
                matrix[i][j] = distance(coordinates[i],coordinates[j],keterangan)
            }
        }
    }
    return {matrix, coordinates};
}
export {aStar, parserInputA, distance, distance_map};

// console.log(aStar([[0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 1, 0, 1, 0], [0, 1, 1, 1, 0, 0, 1, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0]], [[3, 4], [2, 3], [0, 0], [0, 4], [0.5, 0], [3, 3], [3, 2], [1, 1], [6, 4]], 2, 8))
const graph1=[
    [0,0,0,1,0,0,0,0,1],
[0,0,0,0,0,1,0,1,0],
[0,0,0,1,1,0,0,1,0],
[1,0,1,0,0,0,0,1,0],
[0,0,1,0,0,0,0,0,1],
[0,1,0,0,0,1,1,0,1],
[0,0,0,0,0,1,0,1,0],
[0,1,1,1,0,0,1,0,0],
[1,0,0,0,1,1,0,0,0] //i 8
]
const point1 =[[30,40],[15,3],[0,0],[0,40],[30,0],[30,30],[30,20],[10,10],[60,40]]
for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        if(graph1[i][j]!==0){
            graph1[i][j] = distance(point1[i],point1[j])
        }
    }
}
// console.log(distance(point1[0],point1[1]))
// console.log(graph1)
// console.log("pathtotal",aStar(graph1,point1,2,8).pathTotal)
// console.log("weight",aStar(graph1,point1,2,8).weight)
