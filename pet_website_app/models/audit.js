const mongoose = require('mongoose');

// Schema with fields from products collection in MongoDB
const auditSchema = new mongoose.Schema({
productName: String,
adminName: String,
action: String,
timeStamp: String
});

class AuditClass {
    constructor(productName, adminName, action, timeStamp) {
    this.productName = productName;
    this.adminName = adminName;
    this.action = action;
    this.timeStamp = timeStamp;
}
}

const Audit = mongoose.model('Audit', auditSchema);

module.exports = {AuditClass, Audit};
