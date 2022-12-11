let testMonkeys = [
    {
        monkey : 0,
        startingItems : [79,98],
        operation : {op: '*', num : 19 },
        test : {divis : 23},
        true : 2,
        false : 3,
        inspected : 0
    },
    {
        monkey : 1,
        startingItems : [54, 65, 75, 74],
        operation : {op: '+', num : 6 },
        test : {divis : 19},
        true : 2,
        false : 0,
        inspected : 0
    },
    {
        monkey : 2,
        startingItems : [79, 60, 97],
        operation : {op: '*', num : 'old'},
        test : {divis: 13},
        true : 1,
        false : 3,
        inspected : 0
    },
    {
        monkey : 3,
        startingItems : [74],
        operation : {op: '+', num : 3},
        test : {divis: 17},
        true : 0,
        false : 1,
        inspected : 0
    }
]
let monkeys = [
    {
        monkey : 0,
        startingItems : [61],
        operation : {op: '*', num : 11},
        test : {divis: 5},
        true : 7,
        false : 4,
        inspected : 0
    },
    {
        monkey : 1,
        startingItems : [76, 92, 53, 93, 79, 86, 81],
        operation : {op: '+', num : 4},
        test : {divis: 2},
        true : 2,
        false : 6,
        inspected : 0
    },
    {
        monkey : 2,
        startingItems : [91, 99],
        operation : {op: '*', num : 19},
        test : {divis: 13},
        true : 5,
        false : 0,
        inspected : 0
    },
    {
        monkey : 3,
        startingItems : [58, 67, 66],
        operation : {op: '*', num : 'old'},
        test : {divis: 7},
        true : 6,
        false : 1,
        inspected : 0
    },
    {
        monkey : 4,
        startingItems : [94, 54, 62, 73],
        operation : {op: '+', num : 1},
        test : {divis: 19},
        true : 3,
        false : 7,
        inspected : 0
    },
    {
        monkey : 5,
        startingItems : [59, 95, 51, 58, 58],
        operation : {op: '+', num : 3},
        test : {divis: 11},
        true : 0,
        false : 4,
        inspected : 0
    },
    {
        monkey : 6,
        startingItems : [87, 69, 92, 56, 91, 93, 88, 73],
        operation : {op: '+', num : 8},
        test : {divis: 3},
        true : 5,
        false : 2,
        inspected : 0
    },
    {
        monkey : 7,
        startingItems : [71, 57, 86, 67, 96, 95],
        operation : {op: '+', num : 7},
        test : {divis: 17},
        true : 3,
        false : 1,
        inspected : 0
    }
]
//new and old represent worry level, corresponds to item numbers
//start - operation - Math.floor(worryLevel/3) - test
//each round a monkey throws all its items
//recieving monkey gets item at end of its items list
//keep track of how many times monkey inspected an item over 20 rounds
//two most active monkeyList inspected num * eachother = monkey business
let numMod = monkeys.map(e=>{return e.test.divis}).reduce((acc, num)=>{return acc*num}, 1)
console.log(numMod)

function performRounds (monkeyList, rounds){
    for(let i = 0; i < rounds; i++){
        for (let monkey in monkeyList){
            let monke = monkeyList[monkey]
            let startingLength = monke.startingItems.length
            for(let j = 0; j < startingLength; j++){
                let start = monke.startingItems.shift()
                let num = monke.operation.num == 'old' ? start : monke.operation.num;
                let op = monke.operation.op
                //let worry = Math.floor(eval(`${start}${op}${num}`)/3) part 1
                let worry = eval(`${start}${op}${num}`)
                worry = worry % numMod
                //console.log(`worry:${worry} test:${worry % monke.test.divis === 0} num:${num} start:${start}`)
                if(worry % monke.test.divis === 0){
                    monkeyList[monke.true].startingItems.push(worry)
                }else{
                    monkeyList[monke.false].startingItems.push(worry)
                }
                monke.inspected++;
            }
        }
    }
    return monkeyList
}
let monkeyStatus = performRounds(monkeys, 10000)
let monkeyInspects = monkeyStatus.map(monk=>{return monk.inspected})
monkeyInspects = monkeyInspects.sort((a,b)=>{return a-b})
let monkeyBusiness = monkeyInspects[monkeyInspects.length-1]*monkeyInspects[monkeyInspects.length-2]
console.log(`${monkeyInspects[monkeyInspects.length-1]} and ${monkeyInspects[monkeyInspects.length-2]}`)
console.log(monkeyBusiness)
console.log(monkeyStatus.forEach(monk=>{return console.log(monk.inspected)}))