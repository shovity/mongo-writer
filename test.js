const Writer = require('.')

const writer = new Writer()

writer.on('write', (operators) => {
    console.log(operators)
})

writer.insert({ a: 1 })