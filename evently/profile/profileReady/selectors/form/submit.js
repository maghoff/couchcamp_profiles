function(e) {
  e.preventDefault();
  var form = $(this);
  var f = form.serializeObject();
  var doc = {
    created_at : new Date(),
    profile : $$("#profile").profile,
    bio : f.bio,
    name : f.name,
    company : f.company,
    urls : {
      www : f["url-www"],
      sourcecode : f["url-sourcecode"],
      twitter : f["url-twitter"],
      couchdb : f["url-couchdb"]
    },
    email : f.email
  };
  var db = $$(this).app.db;

  db.saveDoc(doc, {
    success : function() {
      $("input[name='_rev']", form).val(doc._rev);
      var as = $("input[name='_attachments']", form).val();
      if (as) {
        $("[name=name]", form).val("Uploading file...");
        // thank you cmlenz for Futon's original upload code
        form.ajaxSubmit({
          url: db.uri + $.couch.encodeDocId(doc._id),
          success: function(resp) {
            form[0].reset();
          }
        });
      } else {
        form[0].reset();
      }
    }
  });
  return false;
};
