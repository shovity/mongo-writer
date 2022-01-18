const EventEmiiter = require('events')


class Writer extends EventEmiiter {

    constructor(option) {
        super()

        this.operators = []

        this.option = Object.assign({
            intervalTime: 1000,
            intervalFluctuate: 0.5,
            operatorsLimit: 999,
            write: null,
            collection: null,
        }, option)

        const getDelayTime = () => {
            return this.option.intervalTime * (
                Math.random() * this.option.intervalFluctuate - this.option.intervalFluctuate * 0.5 + 1
            )
        }

        const tick = () => {
            setTimeout(() => {
                this.write()
                setTimeout(tick, getDelayTime())
            }, getDelayTime())
        }
    
        tick()
    }

    add (operator) {
        this.operators.push(operator)

        if (this.operators.length > this.option.operatorsLimit) {
            this.write()
        }
    }

    write () {
        if (!this.operators.length) {
            return
        }

        const buffer = [...this.operators]

        this.operators = []
        
        if (this.option.collection) {
            this.option.collection.bulkWrite(buffer, { ordered : false })
        }
        
        if (this.option.write) {
            this.option.write(buffer)
        }

        this.emit('write', buffer)
    }

    insert (document, option={}) {
        this.add({
            insertOne: {
               document,
               ...option,
            }
        })
    }

    update (filter, update, option={}) {
        this.add({
            updateOne: {
               filter,
               update,
               ...option,
            }
        })
    }
}


module.exports = Writer