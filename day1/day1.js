let fs = require('fs')
let str = fs.readFileSync('day1.txt').toString();
str = str.replace(/\r/gm, '')

const regex = /^\n^/gm;
const regex2 = /\n^/gm;

const array = str.split(regex)
let arrayArray = array.map(sub =>{return sub.split(regex2)})


console.log(arrayArray)
for (let i = 0; i < arrayArray.length; i++){
    let length = arrayArray[i].length
    for(let j = 0; j < length; j++){
        if(arrayArray[i][j] == ''){
            arrayArray[i].splice(j,1)
            continue
        }
        arrayArray[i][j] = Number(arrayArray[i][j])
    }
}

function findHighest (array) {
    let highest = 0
    let indexOfHighest = 0
    for (let i = 0; i < array.length; i++){
        let length = array[i].length
        let total = 0
        for(let j = 0; j < length; j++){
            total += array[i][j]
        }
        if(total > highest){
            highest = total
            indexOfHighest = i
        }
    }
    return indexOfHighest
}
function sum (array){
    return array.reduce((partialSum, a) => partialSum + a, 0);
}
let idx
const highestCal = sum(arrayArray[idx = findHighest(arrayArray)])
const highestIndex = idx

arrayArray.splice(idx, 1)

const secHighestCal = sum(arrayArray[idx = findHighest(arrayArray)])
const secHighestIndex = idx

arrayArray.splice(idx, 1)

const thrdHighestCal = sum(arrayArray[idx = findHighest(arrayArray)])
const thrdHighestIndex = idx

console.log(highestCal)
console.log(highestCal+secHighestCal+thrdHighestCal)