function insertData(object,idx)
{
  $('.table').append('<tr><td>' + object.from[idx] + '</td><td>' + object.subjects[idx] + '</td><td>' + object.messages[idx] + '</td><td>' + object.dates[idx] + '</td></tr>');
}
function getData()
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST",'/getdata',true);
  xhr.send();
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4 && xhr.status == 200)
    {
      var obj = JSON.parse(this.responseText);
      for(var i=0;i<obj.messages.length;i++)
        insertData(obj,i);
    }
  }
}

$(document).ready(function() {
  getData();
});
