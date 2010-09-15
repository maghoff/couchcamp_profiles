function(doc) {
  if (doc.name) {
    var key = doc.created_at ? new Date(doc.created_at) : new Date("2010/09/08")
    emit(key, doc);
  }
}
