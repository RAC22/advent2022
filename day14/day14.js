const fs = require('fs');
const input = fs.readFileSync('./day14.txt', 'utf8').split('\n').map(e=> e.replace('\r', ''));
const testInput = fs.readFileSync('./test.txt', 'utf8').split('\n').map(e=> e.replace('\r', ''));

let twoDGrid = []

function convertToXY (arr){
    let numRegex = /[0-9]+/gm
    return arr.map((e)=>{
        let newElement = []
        let matches = [...e.matchAll(numRegex)]
        for(let i = 0; i < matches.length; i+=2){
            newElement.push({x:Number(matches[i]), y:Number(matches[i+1])})
        }
        return newElement
    })
}
function findMin (arr, key) {
    let lowest = 10000
    arr.forEach(element => {
        element.forEach(e=>{
            if(e[key] < lowest) lowest = e[key]
        })
    });
    return lowest
}
function findMax (arr, key) {
    let highest = 0
    arr.forEach(element => {
        element.forEach(e=>{
            if(e[key] > highest) highest = e[key]
        })
    });
    return highest
}

let inputMap = convertToXY(input)
let sandEntry = {x: 500, y:0}
inputMap.push([sandEntry])// add sand pouring point
let yMax = findMax(inputMap, 'y')
let yMin = findMin(inputMap, 'y')
// inputMap.push([{x: 300, y: yMax+2},{x:700, y:yMax+2}])  //for part 2
// yMax = findMax(inputMap, 'y')                           //for part 2
// yMin = findMin(inputMap, 'y')                           //for part 2

let xMax = findMax(inputMap, 'x')
let xMin = findMin(inputMap, 'x')
let xDif = xMax - xMin
let yDif = yMax - yMin

for(let y = 0; y <= yDif; y++){
    twoDGrid.push([])
}
for (let arr in twoDGrid){
    let row = twoDGrid[arr]
    for(let x = 0; x <= xDif; x++){
        row.push('.')
    }
}
//y is row
//x is column
function drawStoneLines (input, graph){
    input.forEach(line => {
        for(let i = 0; i < line.length; i++){
            let thisPos = line[i]
            let nextPos = line?.[i+1]
            if(nextPos != undefined){
                let xdif = findMax([[thisPos, nextPos]], 'x') - findMin([[thisPos, nextPos]], 'x')
                let ydif = findMax([[thisPos, nextPos]], 'y') - findMin([[thisPos, nextPos]], 'y')
                if(xdif){
                    //draw x
                    for(let i = 0; i <= xdif; i++){
                        let pos = thisPos.x < nextPos.x ? true : false
                        if(pos){
                            graph[thisPos.y - yMin][(thisPos.x + (i))- xMin] = '#'
                        }
                        if(!pos){
                            graph[thisPos.y- yMin][(thisPos.x - (i))- xMin] = '#'
                        }
                    }
                }
                if(ydif){
                    //draw y
                    for(let j = 0; j <= ydif; j++){
                        let pos = thisPos.y < nextPos.y ? true : false
                        if(pos){
                            graph[(thisPos.y + (j))- yMin][thisPos.x - xMin] = '#'
                        }
                        if(!pos){
                            graph[(thisPos.y - (j))- yMin][thisPos.x - xMin] = '#'
                        }
                    }
                }
            }
        }
    })
    return graph
}
function printGrid (grid) {
    for (let arr in grid){
        let row = grid[arr]
        console.log(`${row.join('')}`)
    }
}
function pourSand (map){
    let sandMoving = true
    let sandPoint
    while(sandMoving !== undefined){
        sandPoint = {x: 500, y:0}
        sandMoving = true
        while(sandMoving){
            map[sandPoint.y - yMin][sandPoint.x - xMin] = 'O'
            let nextDrop = map?.[(sandPoint.y+1) - yMin]?.[sandPoint.x - xMin]
            if(nextDrop === undefined){
                sandMoving = undefined
                continue
            }
            if(nextDrop == '.'){
                map[sandPoint.y - yMin][sandPoint.x - xMin] = '.'
                sandPoint.y++
                continue
            }
            if(nextDrop == '#' || nextDrop == 'O'){
                let checkleft = map?.[(sandPoint.y+1) - yMin]?.[(sandPoint.x-1) - xMin]
                let checkRight = map?.[(sandPoint.y+1) - yMin]?.[(sandPoint.x+1) - xMin]
                if(checkleft == '.'){
                    map[sandPoint.y - yMin][sandPoint.x - xMin] = '.'
                    sandPoint.y++
                    sandPoint.x--
                    continue
                }
                if(checkleft == '#' || checkleft == 'O'){
                    if(checkRight == '.'){
                        map[sandPoint.y - yMin][sandPoint.x - xMin] = '.'
                        sandPoint.y++
                        sandPoint.x++
                        continue
                    }
                }
                if(checkleft == undefined){
                    sandMoving = undefined
                    continue
                }
                if(checkleft == undefined && checkRight == undefined){
                    sandMoving = undefined
                    continue
                }if(nextDrop == 'O' && checkleft == 'O'  && checkRight == 'O' && sandPoint.y == 0){
                    sandMoving = undefined
                    continue
                }
                sandMoving = false
            }
        }
        //printGrid(map)
    }
}
//printGrid(stonedMap)
let stonedMap = drawStoneLines(inputMap, twoDGrid)
pourSand(stonedMap)
printGrid(stonedMap)
let numOfStandingSand = 0
for(arr in stonedMap){
    let row = stonedMap[arr]
    for(let char in row){
        let symbol = row[char]
        if(symbol == 'O'){
            numOfStandingSand++
        }
    }
}
console.log(`Part 1 answer:${numOfStandingSand-1} grains of sand chillin`) //part1 answer
//for part two, uncomment the part above, and remove the minus 1