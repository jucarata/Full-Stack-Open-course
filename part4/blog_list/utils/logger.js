const error = (...params) => {
    console.error(params)
}

const printInfo = (...params) => {
    console.log(params)
}

module.exports = {printInfo, error}