function(doc) {
  emit(doc._rev.split("-")[1], doc);
}
