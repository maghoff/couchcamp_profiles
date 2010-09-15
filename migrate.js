var couchdb = require("couchdb")
  , client = couchdb.createClient(5984, "localhost", "xxx", "xxx")
  , db = client.db("profiles")
  ;
  
db.allDocs(function(er, view) {
  view.rows.forEach(function(r) {
    console.log(r.id)
    db.getDoc(r.id, {attachments:true}, function(er, doc) {
      if (er) {
        console.log("getDoc", er)
      } else {
        console.log(doc._id)
        var rev = doc._rev;
        var name = doc._id;
        if (name.length < 30) {
          delete doc._rev;
          delete doc._id;
          doc.name = name;
          db.removeDoc(name, rev, function(er) {
            if (er) {
              console.log("error deleting", name, er)
            } else {
              console.log("deleted", name)
            }
          })
          // console.log("update", doc)
          // db.saveDoc(doc, function(er, resp) {
          //   if (er) {
          //     console.log(er)
          //   } else {
          // 
          //   }
          // })
        }
      }
    });
  });

});