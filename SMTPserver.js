const SMTPserver = require("smtp-server").SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const fs = require('fs');
const server = new SMTPserver({
  secure : true,
  onAuth(auth,sess,cb)
  {
    cb(null,{user : auth.username});
  },
  onData(stream,session,cb)
  {
    simpleParser(stream,function(err, parsed)
    {
      if(err){console.log(err);}
      else
      {
        fs.appendFile('./log.txt',parsed.text,function(err){if(err)console.log(err);});
      }
    });
    stream.on("end",cb);
  }
});
server.listen(8080);
server.on("error",err => {console.log("Err : " + err)});
