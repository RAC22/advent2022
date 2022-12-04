let fs = require('fs')
let str = fs.readFileSync('day2.txt').toString();

let firstSplit = str.split('\n')
let array = firstSplit.map(e =>{return e.split(' ')})
array = array.map(e=>{return e.map(e=>{return e.replace('\r', '')})})

const rockScore = 1
const paperScore = 2
const scissorScore = 3
const winScore = 6
const drawScore = 3
const lossScore = 0

let i = 0
let total = 0
while (i < array.length){
    const match = array[i]
    const enemy = match[0]
    const me = match[1]
    //A=Rock B=Paper C=Scissors
    //X=Rock Y=Paper Z=Scissors
    switch (me){
        case 'X':
            total+=rockScore
            break;
        case 'Y':
            total+=paperScore
            break;
        case 'Z':
            total+=scissorScore
            break;
    }
    function findWin (me, enemy){
        if(me == 'X'){
            if(enemy == 'A'){return 'draw'}
            if(enemy == 'B'){return 'loss'}
            if(enemy == 'C'){return 'win'}
        }
        if(me == 'Y'){
            if(enemy == 'A'){return 'win'}
            if(enemy == 'B'){return 'draw'}
            if(enemy == 'C'){return 'loss'}
        }
        if(me == 'Z'){
            if(enemy == 'A'){return 'loss'}
            if(enemy == 'B'){return 'win'}
            if(enemy == 'C'){return 'draw'}
        }
    }
    let result = findWin(me, enemy)
    switch(result){
        case 'win':
            total+=winScore
            break;
        case 'draw':
            total+=drawScore
            break;
        case 'loss':
            total+=lossScore
            break;
    }
    i++
}
console.log(total) // first part answer

i = 0
total = 0

while (i < array.length){
    const match = array[i]
    const enemy = match[0]
    const needsToEnd = match[1]
    //A=Rock B=Paper C=Scissors
    //X=lose Y=draw Z=win
    switch(needsToEnd){
        case 'X':
            total+=lossScore
            break;
        case 'Y':
            total+=drawScore
            break;
        case 'Z':
            total+=winScore
            break;
    }
    if(enemy == 'A'){
        if(needsToEnd == 'X'){total+=scissorScore}
        if(needsToEnd == 'Y'){total+=rockScore}
        if(needsToEnd == 'Z'){total+=paperScore}
    }
    if(enemy == 'B'){
        if(needsToEnd == 'X'){total+=rockScore}
        if(needsToEnd == 'Y'){total+=paperScore}
        if(needsToEnd == 'Z'){total+=scissorScore}
    }
    if(enemy == 'C'){
        if(needsToEnd == 'X'){total+=paperScore}
        if(needsToEnd == 'Y'){total+=scissorScore}
        if(needsToEnd == 'Z'){total+=rockScore}
    }
    i++
}
console.log(total)

