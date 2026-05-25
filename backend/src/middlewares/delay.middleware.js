async function delayController (req, res, next){
    const ms = parseInt(req.query.ms) || 1000;
    if (ms > 0){
        await new Promise(r => setTimeout(r, ms)
        )
    }
    next();
}



module.exports = {delayController};