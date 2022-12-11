let input = require("fs").readFileSync(`./day10.txt`, "utf-8").split("\n")
input = input.map(e=>{return e.replace('\r', '')})

let testInput = require("fs").readFileSync(`./test.txt`, "utf-8").split("\n")
testInput = testInput.map(e=>{return e.replace('\r', '')})

//execute commands
//first 20 then 40 60 100 140 180 220 cycles record cycle*registerval
//sum up the stored (cycles*register) values
function executeProg (commandList) {
    const duringCycle = [20,60,100,140,180,220]
    let signalStrengthArr = []
    let register = 1
    let cycles = 1
    let continued = false
    let crtLine = ''
    let offset = -1
    function storeSpecialSigStrength (reg, cycle){
        if(duringCycle.includes(cycle)){
            //console.log(`adding ${reg*cycle} reg:${reg} cycle:${cycle}`)
            signalStrengthArr.push(reg*cycle)
        }
    }
    while(commandList.length){
        let split = commandList[0].split(' ')
        let cmd = split[0]
        let arg = parseInt(split[1])
        if(register == cycles+offset || register+1 == cycles+offset || register-1 == cycles+offset){
            crtLine += '▓'
        }else{
            crtLine += ' '
        }
        if(crtLine.length == 40){
            console.log(crtLine)
            crtLine = ''
            offset -= 40
        }
        //console.log(`reg:${register} cyc+off:${cycles+offset} off:${offset} cyc:${cycles} cmd:${cmd} line:${crtLine}`)
        //console.log(`cycles:${cycles} register:${register} cmd:${cmd} arg:${arg} ssarr:${signalStrengthArr}`)
        //console.log()
        storeSpecialSigStrength(register, cycles)
        if(cmd == 'addx'){
            // two cycles to complete
            // at end of those two cycles, register += arg
            if(!continued){
                cycles++
                continued = true
                continue
            }
            continued = false
            cycles++
            register += parseInt(arg)
        }
        if(cmd == 'noop'){
            //takes one cycle, does nothing
            cycles++
        }
        commandList.shift()
    }
    return signalStrengthArr.reduce((a, b) => {
        return a + b;
    })
}
console.log(executeProg(testInput)) // 13140
console.log(executeProg(input))

