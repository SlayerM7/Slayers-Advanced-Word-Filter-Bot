function isEnabled(guild, db) {
  let r = null;
  if (db.has(`filter_${guild}`)) {
    if (db.get(`filter_${guild}`) === true) r = true;
  }
  return r;
}

export { isEnabled };
