const fs = require('fs')
const str = fs.readFileSync('day4.txt').toString()

const firstSplit = str.split('\n')
const replaceCarriages = firstSplit.map(e=>{return e.replace('\r', '')})
const subArrays = replaceCarriages.map(e=>{return e.split(',')})
const subSubNums = subArrays.map(e=>{
    return e.map(e=>{
        return e.split('\-')
    }).flat()
})

let i = 0
let numOfOverlaps = 0
let numPartialOverlaps = 0
while (i < subSubNums.length){
    let one = subSubNums[i][0]
    let two = subSubNums[i][1]
    let three = subSubNums[i][2]
    let four = subSubNums[i][3]

    function isBetween (num, min, max){
        return ((num-min)*(num-max) <= 0)
    }
    
    if((isBetween(one, three, four) && isBetween(two, three, four))||(isBetween(three, one, two) && isBetween(four, one, two))){
        numOfOverlaps++
    }
    if((isBetween(one, three, four) || isBetween(two, three, four))||(isBetween(three, one, two) || isBetween(four, one, two))){
        numPartialOverlaps++
    }
    i++
}
console.log(`${numOfOverlaps} fully overlapped`)
console.log(`${numPartialOverlaps} partial overlaps`)