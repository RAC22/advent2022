let input = require("fs").readFileSync(`./day12.txt`, "utf-8").split("\n")
input = input.map(e=>{return e.replace('\r', '')}).map(e=>{return e.split('')})

let test = require("fs").readFileSync(`./test.txt`, "utf-8").split("\n")
test = test.map(e=>{return e.replace('\r', '')}).map(e=>{return e.split('')})

const valueMap = `abcdefghijklmnopqrstuvwxyz`
class Queue {
    // Array is used to implement a Queue
    constructor(){
        this.items = [];
    }
    // Functions to be implemented
    enqueue(element){
        // adding element to the queue
        this.items.push(element);
    }
    dequeue(){
    // removing element from the queue
    // returns underflow when called
    // on empty queue
        if(this.isEmpty()){
            return "Underflow";
        }
        return this.items.shift();
    }
    front(){
        // returns the Front element of
        // the queue without removing it.
        if(this.isEmpty()){
            return "No elements in Queue";
        }
        return this.items[0];
    }
    isEmpty(){
        // return true if the queue is empty.
        return this.items.length == 0;
    }
    printQueue(){
        let str = "";
        for(let i = 0; i < this.items.length; i++){
            str += this.items[i] +" ";
        }
        return str;
    }
}
let lengthList = []
class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices){
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
    addVertex(v){
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }
    addEdge(v, w){
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.AdjList.get(v).push(w);
        // Since graph is undirected,
        // add an edge from w to v also
        //this.AdjList.get(w).push(v);
    }
    printGraph(){
        // get all the vertices
        let get_keys = this.AdjList.keys();
        // iterate over the vertices
        for (let i of get_keys){
            // great the corresponding adjacency list
            // for the vertex
            let get_values = this.AdjList.get(i);
            let conc = "";
            // iterate over the adjacency list
            // concatenate the values into a string
            for (let j of get_values)
                conc += j + " ";
            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
    bfs(startingNode, endingNode){
        // create a visited object
        let visited = {}
        // Create an object for queue
        let q = new Queue();
        let start = {startN: startingNode, steps:0}
        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(start);
        // loop until queue is empty
        while (!q.isEmpty()) {
            let {startN, steps} = q.dequeue();
            steps++
            //console.log(`${startN} ${steps}`)
            if(startN == endingNode){
                console.log(steps-1)
                break
            }
            let get_List = this.AdjList.get(startN);
            //console.log(get_List)
            for (let i in get_List) {
                let neigh = get_List[i];
                let neighNode = {startN:neigh, steps:steps}
                //console.log(neighNode)
                if (!visited[neighNode.startN]) {
                    visited[neighNode.startN] = true;
                    q.enqueue(neighNode);
                }
            }
        }
    }
    dfs(start, finish){
        let visited = {}
        let pathList = []
        this.DFSUtil(start, finish, visited, pathList)
    }
    // Recursive function which process and explore
    // all the adjacent vertex of the vertex with which it is called
    DFSUtil(start, finish, visited, pathList){
        console.log(`Pathlist:${pathList}`)
        if(start == finish){
            lengthList.push(pathList.length)
            console.log(pathList.length)
            let neighbors = this.AdjList.get(start)
            for (let j in neighbors){
                let neighbor = neighbors[j]
                visited[neighbor] = true
            }
        }
        visited[start] = true;
        let get_neighbours = this.AdjList.get(start)
        //console.log(`neighbors: ${get_neighbours}`)
        for (let i in get_neighbours) {
            let get_elem = get_neighbours[i];
            //console.log(visited[get_elem])
            if (!visited[get_elem]){
                pathList.push(get_elem)
                this.DFSUtil(get_elem, finish, visited, pathList)
                pathList.splice(pathList.indexOf(get_elem), 1)
            }
        }
        visited[start] = false
    }
}

let testGraph = new Graph();
let inputGraph = new Graph();
let startingNode = ''
let endingNode = ''
function findHeight (value){
    firstValue = value.split('')[0]
    if(firstValue == 'E'){
        return 25
    }
    if(firstValue == 'S'){
        return 0
    }
    return valueMap.indexOf(firstValue)
}
function buildGraph (array, graphInst) {
    let key = 0
    for (let sub in array){
        let subArr = array[sub]
        for (let char in subArr){
            let vert = subArr[char]
            if(vert == 'S'){startingNode = `${vert}${key}`}
            if(vert == 'E'){endingNode = `${vert}${key}`}
            graphInst.addVertex(`${vert}${key}`)
            subArr[char] = `${vert}${key}`
            key++
        }
    }
    for (let i = 0; i < array.length; i++){
        let row = array[i]
        for (let j = 0; j < row.length; j++){
            let vert = array[i][j]
            let firstLetter = vert.split('')[0]
            let vertHeight = 0
            if(firstLetter == 'S' ){
                vertHeight = 0
            }else if(firstLetter == 'E'){
                vertHeight = 25
            }else{
                vertHeight = valueMap.indexOf(firstLetter)
            }
            if(i >= 1){
                let up = array[i-1][j]
                let upHeight = findHeight(up)
                if(vertHeight >= upHeight || vertHeight+1 == upHeight){
                    graphInst.addEdge(vert, up )
                }
            }
            if(i < array.length-1){
                let down = array[i+1][j]
                let downHeight = findHeight(down)
                if(vertHeight >= downHeight || vertHeight+1 == downHeight){
                    graphInst.addEdge(vert, down )
                }
            }
            if(j >= 1){
                let left = array[i][j-1]
                let leftHeight = findHeight(left)
                if(vertHeight >= leftHeight || vertHeight+1 == leftHeight){
                    graphInst.addEdge(vert, left)
                }
            }
            if(j < row.length-1){
                let right = array[i][j+1]
                let rightHeight = findHeight(right)
                if(vertHeight >= rightHeight || vertHeight+1 == rightHeight){
                    graphInst.addEdge(vert, right)
                }
            }
        }
    }
}
//buildGraph(test, testGraph)
buildGraph(input, inputGraph)
console.log(`graph built`)
console.log(`starting Node:${startingNode} ending Node:${endingNode}`)
//inputGraph.printGraph()
inputGraph.bfs(startingNode, endingNode)
//testGraph.dfs(startingNode, endingNode)
console.log('tree searched')
