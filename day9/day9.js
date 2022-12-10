let input = require("fs").readFileSync(`./day9.txt`, "utf-8").split("\n")
input = input.map(e=>{return e.replace('\r', '')})

const testData = [
    'R 4',
    'U 4',
    'L 3',
    'D 1',
    'R 4',
    'D 1',
    'L 5',
    'R 2'
]
const partTwoTest = [
    'R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20'
]
const directionKey = {
    L: { x: -1, y:  0 },
    R: { x:  1, y:  0 },
    U: { x:  0, y: -1 },
    D: { x:  0, y:  1 }
}
function simulateMovements (movesArr) {
    let tailPosHistory = new Set(['0,0'])
    let tailPos = { x:0, y:0 }
    let headPos = {x:0, y:0 }
    movesArr.forEach(moveSet => {
        moveSet = moveSet.split(' ')
        let direction = moveSet[0]
        let dif = directionKey[direction]
        let distance = parseInt(moveSet[1])
        function iterateMove (diff, dist){
            for(let i = 0; i < dist; i++){
                headPos.x += diff.x
                headPos.y += diff.y
                let xDif = headPos.x - tailPos.x
                let yDif = headPos.y - tailPos.y
                if (Math.abs(xDif) >= 2) {
                    tailPos.x += Math.sign(xDif);
                    if (Math.abs(yDif) != 0) tailPos.y += Math.sign(yDif);
                } else if (Math.abs(yDif) >= 2) {
                    tailPos.y += Math.sign(yDif);
                    if (Math.abs(xDif) != 0) tailPos.x += Math.sign(xDif);
                }
                tailPosHistory.add(`${tailPos.x},${tailPos.y}`)
            }
        }
        iterateMove(dif, distance)
    })
    return tailPosHistory.size
}
function longRope (movesArr){
    // index 0 is head, and 9 is tail
    let body = new Array(10).fill(0).map(element => {
        return { x: 0, y: 0 }
    })
    let tailPosHist = new Set(['0,0'])
    movesArr.forEach(moveSet=>{
        moveSet = moveSet.split(' ')
        let direction = moveSet[0]
        let dif = directionKey[direction]
        let distance = parseInt(moveSet[1])
        for(let i = 0; i < distance; i++){
            body[0].x += dif.x
            body[0].y += dif.y
            for(let j = 1; j < body.length; j++){
                //j is body segment index
                let distX = body[j - 1].x - body[j].x;
                let distY = body[j - 1].y - body[j].y;
                if (Math.abs(distX) >= 2) {
                    body[j].x += Math.sign(distX)
                    if (Math.abs(distY) != 0) body[j].y += Math.sign(distY)
                } else if (Math.abs(distY) >= 2) {
                    body[j].y += Math.sign(distY)
                    if (Math.abs(distX) != 0) body[j].x += Math.sign(distX)
                }
                tailPosHist.add(`${body[9].x},${body[9].y}`)
            }
        }
    })
    return tailPosHist.size
}
console.log(simulateMovements(testData)) // 13
console.log(simulateMovements(input))
console.log(longRope(partTwoTest)) // 36
console.log(longRope(input))