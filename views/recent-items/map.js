function(doc) {
  if (doc.name) {
    emit(doc._rev.split("-")[1], doc);    
  }
}
