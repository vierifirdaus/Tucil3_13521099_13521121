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

function UCS(graph, start, finish){
    const liveNode = new PriorityQueue()
    
    liveNode.enqueue([start],0)
    let pathTotal=null

    if(start<0 || finish<0 || start>=graph.length || finish>=graph.length){
        pathTotal=null
    }
    
    const weight = new Array(graph.length).fill(Infinity)
    weight[start] = 0

    // console.log("livenode")
    // console.log(liveNode.dequeue())

    while(!liveNode.isEmpty()){
        const current = liveNode.dequeue()
        // console.log("current",current)
        if(current.element[0] === finish){
            pathTotal = current.element
            break;
        }

        for(let i=0;i<graph[current.element[0]].length;i++){
            if(graph[current.element[0]][i] > 0){
                const newWeight = current.priority + graph[current.element[0]][i]
                if(newWeight < weight[i]){
                    weight[i] = newWeight
                    const priority = newWeight
                    const newNode= [i].concat(current.element)
                    liveNode.enqueue(newNode,priority)
                }
            }
        }
    }   


    let distanceMinimum=weight[finish]
            
    return {pathTotal,distanceMinimum}
}

function parserInputUCS(graph){
    const rows = graph.trim().split("\n");
    const matrix = rows.map((row) => row.split(" ").map((val) => parseInt(val)));
    return matrix;
}

export  {UCS,parserInputUCS};

const graph21=[
    [0,2,1,0,0],
    [2,0,2,0,2],
    [1,2,0,1,0],
    [0,0,1,0,1],
    [0,2,0,1,0]]
const graph3=[
    [0,20,30,0,0],
    [20,0,15,20,0],
    [30,15,0,0,13],
    [0,20,0,0,9],
    [0,0,13,9,0]
]
const graph2=[
    [0,1,2,0,0,0,0], //a
    [1,0,1,0,8,0,0], //b
    [2,1,0,7,0,4,0], //c
    [0,0,7,0,2,2,1], //d
    [0,8,0,2,0,0,8], //e
    [0,0,4,2,0,0,0], //f
    [0,0,0,1,8,0,0]  //g
]
// function distance(a,b){
//     return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
// }

// const graph1=[
//     [0,0,0,1,0,0,0,0,1],
// [0,0,0,0,0,1,0,1,0],
// [0,0,0,1,1,0,0,1,0],
// [1,0,1,0,0,0,0,1,0],
// [0,0,1,0,0,0,0,0,1],
// [0,1,0,0,0,1,1,0,1],
// [0,0,0,0,0,1,0,1,0],
// [0,1,1,1,0,0,1,0,0],
// [1,0,0,0,1,1,0,0,0] //i 8
// ]
// const point1 =[[30,40],[15,3],[0,0],[0,40],[30,0],[30,30],[30,20],[10,10],[60,40]]
// for(let i=0;i<9;i++){
//     for(let j=0;j<9;j++){
//         if(graph1[i][j]!==0){
//             graph1[i][j] = distance(point1[i],point1[j])
//         }
//     }
// }

// console.log(UCS(graph1,2,8))