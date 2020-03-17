const SMTPserver = require("smtp-server").SMTPServer;
const simpleParser = require('mailparser').simpleParser;
const fs = require('fs');
const port = process.env.PORT || 9000;
console.log("SMTP server running");
const server = new SMTPserver({
  secure : true,
  onAuth(auth,session,cb)
  {
    return cb(null,{user : 123});
  },
  onData(stream,session,cb)
  {
    simpleParser(stream,function(err, parsed)
    {
      if(err){console.log(err);}
      else
      {
        fs.appendFileSync('../data/messages.txt',parsed.text,function(err){if(err)console.log(err);});
        fs.appendFileSync('../data/subjects.txt',parsed.subject+"\n",function(err){if(err)console.log(err);});
        fs.appendFileSync('../data/from.txt',parsed.from.text+"\n",function(err){if(err)console.log(err);});
        fs.appendFileSync('../data/dates.txt',parsed.date+"\n",function(err){if(err)console.log(err);});
      }
    });
    stream.on("end",cb);
  }
});
server.listen(port);
server.on("error",err => {console.log("Err : " + err)});
