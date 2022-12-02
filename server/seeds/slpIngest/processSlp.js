const processSlp = (game) => {
    try {
        return { message: 'sucesss', game: game }
    } catch (err) {
        return err
    }
}

module.exports = processSlp