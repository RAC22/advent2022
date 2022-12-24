const fs = require('fs');
const input = fs.readFileSync('./day15.txt', 'utf8').split('\n').map(e=> e.replace('\r', ''));
const testInput = fs.readFileSync('./test.txt', 'utf8').split('\n').map(e=> e.replace('\r', ''));

function convertToXY (arr){
    let numRegex = /-?[0-9]+/gm
    return arr.map((e)=>{
        let matches = [...e.matchAll(numRegex)]
        return [{x:Number(matches[0]), y:Number(matches[1])},{x:Number(matches[2]), y:Number(matches[3])}]
    })
}
function fillSetWithExclusionCoords (xy, yCoord){
    let excludedPoints = new Set()
    let beaconsList = new Set()
    for(sub in xy){
        let element = xy[sub]
        let sensor = element[0]
        let beacon = element[1]
        beaconsList.add(JSON.stringify(beacon))
        let distance = Math.abs(sensor.x - beacon.x)+Math.abs(sensor.y - beacon.y)
        for (let i = 0; i <= distance; i++){
            let minusY = sensor.y - i
            let plusY = sensor.y + i
            if(minusY !== yCoord && plusY !== yCoord){
                continue
            }
            let subDistance = distance - i
            for(let j = 0; j <= subDistance; j++){
                let minusX = sensor.x - j
                let plusX = sensor.x + j
                if(minusY == yCoord){
                    excludedPoints.add(JSON.stringify({x:plusX, y:minusY}))
                    excludedPoints.add(JSON.stringify({x:minusX, y:minusY}))
                }
                if(plusY == yCoord){
                    excludedPoints.add(JSON.stringify({x:plusX, y:plusY}))
                    excludedPoints.add(JSON.stringify({x:minusX, y:plusY}))
                }
            }
        }
        //console.log(`Sensor at:${sensor.x},${sensor.y} closest beacon at:${beacon.x},${beacon.y} distance = ${distance}`)
    }
    excludedPoints.forEach(point=>{
        if(beaconsList.has(point)){
            excludedPoints.delete(point)
        }
    })
    return excludedPoints
}
function searchForDistressSignalBeacon (xy, yCoord){
    const xymax = 20
    const xymin = 0
    let excludedPoints = new Set()
    //let beaconsList = new Set()
    for(sub in xy){
        let element = xy[sub]
        let sensor = element[0]
        let beacon = element[1]
        //beaconsList.add(JSON.stringify(beacon))
        let distance = Math.abs(sensor.x - beacon.x)+Math.abs(sensor.y - beacon.y)
        for (let i = 0; i <= distance; i++){
            let minusY = sensor.y - i
            let plusY = sensor.y + i
            if(minusY !== yCoord && plusY !== yCoord){
                continue
            }
            let subDistance = distance - i
            for(let j = 0; j <= subDistance; j++){
                let minusX = sensor.x - j
                let plusX = sensor.x + j
                if(minusX < xymin || minusX > xymax){
                    continue
                }
                //console.log(`X+:${plusX} X-:${minusX} ${plusX > xymax}`)
                if(minusY == yCoord){
                    if(plusX <= xymax && plusX >= xymin){
                        excludedPoints.add(JSON.stringify({x:plusX, y:minusY}))
                    }
                    if(minusX <= xymax && minusX >= xymin){
                        excludedPoints.add(JSON.stringify({x:minusX, y:minusY}))
                    }
                }
                if(plusY == yCoord){
                    if(plusX <= xymax && plusX >= xymin){
                        excludedPoints.add(JSON.stringify({x:plusX, y:plusY}))
                    }
                    if(minusX <= xymax && minusX >= xymin){
                        excludedPoints.add(JSON.stringify({x:minusX, y:plusY}))
                    }
                }
            }
        }
        //console.log(`Sensor at:${sensor.x},${sensor.y} closest beacon at:${beacon.x},${beacon.y} distance = ${distance}`)
    }
    console.log(excludedPoints.size)
    if(excludedPoints.size < 19){
        let count = 0
        let arr = Array.from(excludedPoints).map(e=>JSON.parse(e)).sort((a,b)=>{return a.x - b.x}).forEach(e=>{
            if(e.x != count){
                return {x:e.x-1, y:yCoord}
            }else{
                count++
            }
        })
    }else{
        return false
    }
}

let xy = convertToXY(testInput)
let num = fillSetWithExclusionCoords(xy, 10)
console.log(num.size)
let distressCoords = {}
for(let i = 0; i <= 20; i++){
    console.log(`searching Y:${i}`)
    console.time('run')
    distressCoords = searchForDistressSignalBeacon(xy, i)
    console.timeEnd('run')
    if(distressCoords != false){
        break
    }
}
console.log(distressCoords)
console.log((distressCoords.x * 4000000) + distressCoords.y)
