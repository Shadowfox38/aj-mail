var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host : "localhost" ,
    port : 8080 ,
    secure : true,
    auth : {
      user : "shadowfox",
      pass : "password"
    },
    tls: { rejectUnauthorized: false }
  });

for(var i=0;i<5;i++)
{
  var str = "cool_dude_number_" + i + "@localhost";
  var mailoptions = {
    from : "sender@ILYakhil.com",
    to : str,
    subject : "This is a test mail",
    text : "Test message no. " + i
  };

  transport.sendMail(mailoptions,function(err,info)
  {
    if(err){console.log(err);}
    else{console.log(info.response);}
  });
}
