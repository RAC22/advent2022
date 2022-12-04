let fs = require('fs')
let str = fs.readFileSync('day3.txt').toString();

const firstSplit = str.split('\n')
const array = firstSplit.map(e =>{
    let subArray = []
    const halfwayIndex = e.length/2;
    const firstHalf = e.slice(0 , halfwayIndex)
    const secondHalf = e.slice(halfwayIndex, e.length)
    subArray.push(firstHalf)
    subArray.push(secondHalf)
    return subArray
})

const priorities = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
function prio (char){
    return priorities.indexOf(char) + 1
}

//part1
let sum = 0

for (let i = 0; i < array.length; i++){
    let sub1 = array[i][0]
    let sub2 = array[i][1]
    for(let j = 0; j < sub1.length; j++){
        if(sub2.includes(sub1[j])){
            sum += prio(sub1[j])
            break
        }
    }
}

console.log(sum)
// end part 1
let groups = []
while (firstSplit.length){
    let sub = []
    sub.push(firstSplit[0])
    sub.push(firstSplit[1])
    sub.push(firstSplit[2])
    groups.push(sub)
    firstSplit.shift()
    firstSplit.shift()
    firstSplit.shift()
}

sum = 0

for (let i = 0; i < groups.length; i++){
    let sub1 = groups[i][0]
    let sub2 = groups[i][1]
    let sub3 = groups[i][2]
    for(let j = 0; j < sub1.length; j++){
        if(sub2.includes(sub1[j])){
            if(sub3.includes(sub1[j])){
                sum += prio(sub1[j])
                break
            }
        }
    }
}

console.log(sum)
