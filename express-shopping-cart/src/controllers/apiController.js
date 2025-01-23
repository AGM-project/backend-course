const validator = require('validator');

exports.postValidateInput = (req, res) => {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Input tidak valid' });
    }
    res.status(200).json({ message: 'Input valid', email });
};