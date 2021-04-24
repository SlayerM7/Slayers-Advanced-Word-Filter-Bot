"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEnabled = void 0;
function isEnabled(guild, db) {
    let r = null;
    if (db.has(`filter_${guild}`)) {
        if (db.get(`filter_${guild}`) === true)
            r = true;
    }
    return r;
}
exports.isEnabled = isEnabled;
