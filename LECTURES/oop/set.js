class Set {
    constructor() {
        this.collection = []
    }

    add(x) {
        if (this.collection.indexOf(x) < 0) {
            this.collection.push(x);
        }
    }

    remove(x) {
        let posistion = this.collection.indexOf(x)
        const NUM_TO_DELETE = 1
        if (posistion > - 1) {
            this.collection.splice(posistion, NUM_TO_DELETE)
        }
    }

    contains(x) {
        return this.collections.indexOf(x) > -1
    }
    
    toString() {
        return this.collection.toString()
    }
}


module.exports = Set