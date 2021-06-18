const { PORT } = process.env;
exports.post = async(req, res) => {
    return res.json({ id: PORT });
}