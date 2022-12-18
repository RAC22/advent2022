const fs = require('fs');
const input = fs.readFileSync('./test.txt', 'utf8').split('\n').map(e=>e.replace('\r', ''))
let split = []
let count = 0
for (let i = 0; i < input.length; i++){
    if(count == 2){
        split.push([input[i-2],input[i-1]])
        count = 0
        continue
    }
    count ++
}
split.push([input[input.length-2], input[input.length-1]])
//if both integers, lower should be first, same ? next :
//if both are lists > compare first values then second etc
//first should run out first else wrong, if same continue
//if value is int, convert to list that contains that int and compare
//list indexes of "pairs" that ARE in the "right" order, and sum
//first is 1
//make empty arrays == 0 ?
let correctIndexes = []
for(let i = 0; i < split.length; i++){
    let pair = split[i]
    let left = JSON.parse(pair[0])
    let right = JSON.parse(pair[1])
    function flatCompare (leftE, rightE){
        leftE = leftE.flat()
        rightE = rightE.flat()
        console.log(`flat compare left:${leftE}  right:${rightE}`)
        const greatest = Math.max(leftE.length,rightE.length)
        console.log(`greatest:${greatest} leftLength:${leftE.length} rightLength:${rightE.length}`)
        for(let i = 0; i < greatest; i++){
            console.log(`flat comparing ${leftE[i]} and ${rightE[i]}`)
            if(leftE[i] == ''){
                leftE[i] = 0
            }
            if(rightE[i] == ''){
                rightE[i] = 0
            }
            if(leftE[i] < rightE[i]){
                return true
            }
            if(leftE[i] > rightE[i]){
                return false
            }
            if(leftE[i] == undefined && rightE[i] != undefined){
                return true
            }
            if(leftE[i] != undefined && rightE[i] == undefined){
                return false
            }
        }
    }
    function compare (leftElement, rightElement){
        console.log(`begin new compare left:${leftElement}  right:${rightElement}`)
        if(leftElement.length == 0){
            console.log(`Left empty return true`)
            return true
        }
        if(rightElement.length == 0){
            console.log(`Right empty return false`)
            return false
        }
        let leftDigi = leftElement?.[0]
        let rightDigi = rightElement?.[0]
        console.log(`${leftDigi}     ${rightDigi} ${typeof leftDigi} ${typeof rightDigi}`)
        if(typeof leftDigi == 'object' && typeof rightDigi == 'object'){
            console.log(`left obj, right obj`)
            return flatCompare(leftElement, rightElement)
        }
        if(typeof leftDigi == 'object' && typeof rightDigi == 'number'){
            console.log(`right obj left num`)
            rightDigi = [rightDigi]
            return flatCompare(leftDigi, rightDigi)
        }
        if(typeof rightDigi == 'object' && typeof leftDigi == 'number'){
            console.log(`leftdigi num:${leftDigi}, rightdigi obj:${rightDigi} `)
            leftDigi = [leftDigi]
            return flatCompare(leftDigi, rightDigi)
        }
        if(leftDigi == undefined){
            leftDigi = leftElement
            console.log(`left digi undefined now:${leftDigi}`)
        }
        if(rightDigi == undefined){
            rightDigi == rightElement
            console.log(`rightDigi undefined, now:${rightDigi}`)
        }
        if(typeof leftDigi == 'number' && typeof rightDigi == 'number'){
            if(leftDigi < rightDigi){
                console.log(`left < right return true`)
                return true
            }
            if(rightDigi < leftDigi){
                console.log(`right < left return false`)
                return false
            }
            if(leftDigi == rightDigi){
                console.log(`${leftElement} and ${rightElement}`)
                return flatCompare(leftElement, rightElement)
            }
        }
        console.log(`--nothing just shift and recurse ${leftElement} ${rightElement}`)
        leftElement.shift()
        rightElement.shift()
        console.log(`--after shift ${leftElement}   ${rightElement}`)
        //return compare(leftElement, rightElement)
    }
    console.log(`${left}      ${right}`)
    let correctOrder = compare(left, right)
    if(correctOrder){
        console.log(`pushing ${i+1}`)
        correctIndexes.push(i+1)
    }
    console.log(`-----${i+1} ${correctOrder}--------`)
}
let sum = correctIndexes.reduce((a, b)=>{return a + b}, 0)
console.log(sum)