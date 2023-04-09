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

function distance(a,b){
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
}

function aStar(graph, point, start, finish){
    const liveNode = new PriorityQueue()

    liveNode.enqueue([start],0)
    let pathTotal=null
    const weight = new Array(graph.length).fill(Infinity)
    weight[start] = 0
    if(start<0 || finish<0 || start>=graph.length || finish>=graph.length || point.length!==graph.length){
        pathTotal=null
        return {pathTotal,weight}
    }

    // console.log("livenode")
    // console.log(liveNode.dequeue())

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
                console.log(current.element[0],i) 
                if(newDistance < weight[i]){
                    const straightLineDistance = distance(point[i],point[finish])
                    const totalDistance= newDistance + straightLineDistance
                    weight[i] = newDistance
                    const newNode= [i].concat(current.element)
                    liveNode.enqueue(newNode,totalDistance)
                }
            }
        }
    }   

            
    return {pathTotal,weight}
}
function parserInputA(inputStr) {
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
export {aStar, parserInputA};

// console.log(aStar([[0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0, 1, 0], [0, 0, 0, 1, 1, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 1, 0, 1, 0], [0, 1, 1, 1, 0, 0, 1, 0, 0], [1, 0, 0, 0, 1, 1, 0, 0, 0]], [[3, 4], [2, 3], [0, 0], [0, 4], [0.5, 0], [3, 3], [3, 2], [1, 1], [6, 4]], 2, 8))
// const graph1=[
//     [0,0,0,1,0,0,0,0,1], //a 0
//     [0,0,0,0,0,1,0,1,0], //b 1
//     [0,0,0,1,1,0,0,0,0], //c 2
//     [1,0,1,0,0,0,0,0,0], //d 3
//     [0,0,1,0,0,0,0,0,1], //e 4
//     [0,1,0,0,0,1,1,0,1], //f 5
//     [0,0,0,0,0,1,0,1,0], //g 6
//     [0,1,1,1,0,0,1,0,0], //h 7
//     [1,0,0,0,1,1,0,0,0]  //i 8
// ]
// const point1 =[[3,4],[2,3],[0,0],[0,4],[0.5,0],[3,3],[3,2],[1,1],[6,4]]
// for(let i=0;i<9;i++){
//     for(let j=0;j<9;j++){
//         if(graph1[i][j]!==0){
//             graph1[i][j] = distance(point1[i],point1[j])
//         }
//     }
// }
// // console.log(distance(point1[0],point1[1]))
// // console.log(graph1)
// console.log("pathtotal",aStar(graph1,point1,2,8).pathTotal)
// console.log("weight",aStar(graph1,point1,2,8).weight)
