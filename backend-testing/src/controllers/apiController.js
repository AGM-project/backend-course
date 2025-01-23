const validator = require('validator');
exports.getHello = (req, res) => {
res.status(200).json({ message: 'Hello, World!' });
};
exports.postValidateInput = (req, res) => {
const { input } = req.body;
if (!validator.isAlphanumeric(input)) {
return res.status(400).json({ error: 'Input tidak valid' });
}
res.status(200).json({ message: 'Input valid', input });
};