// YOUR CODE HERE:


var problemCharacters = {
  '&' : '&amp;',
  '<' : '&lt;',
  '>' : '&gt;',
  '"' : '&quot;',
  "'" : '&#39;',
  '`' : '&grave;',
  ',' : '&comma;',
  ' ' : '&nbsp;',
  '!' : '&excl;',
  '@' : '&commat;',
  '$' : '&dollar;',
  '%' : '&percnt;',
  '(' : '&lpar;',
  ')' : '&rpar;',
  '=' : '&equals;',
  '+' : '&plus;',
  '{' : '&lcub;',
  '}' : '&rcub;',
  '[' : '&lsqb;',
  ']' : '&rsqb;'
};

var findProblems = function(string){
  if(string){
    var tempArray = string.split('');

    for(var i=0; i<tempArray.length; i++){
      if(problemCharacters[tempArray[i]]){
        //convert!
        tempArray[i] = problemCharacters[tempArray[i]];
      }
    }

    var result = tempArray.join('');
    return result;
  }
};

var appendMessage = function(data){
  var storage = '';

  for(var i = 0; i< data.results.length; i++){
    storage +='<ul>' +
    '<li>' + findProblems(data.results[i].text) + '</li>' +
    '<li>' + findProblems(data.results[i].username) + '</li>' +
    '<li>' + findProblems(data.results[i].createdAt) + '</li>' +
    '<li>' + findProblems(data.results[i].roomname) + '</li>' +
    '</ul>';
  }

  $('.messages').html(storage);
};

var getData = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data);
      appendMessage(data);
    },
    error: function(){
      console.log('failed :(');
    }
  });
};

getData();
setInterval(getData, 5000);
