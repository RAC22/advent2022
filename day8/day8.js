let input = require("fs").readFileSync(`./day8.txt`, "utf-8").split("\n")
input = input.map(e=>{return e.replace('\r', '')})

console.log(input)