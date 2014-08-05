// YOUR CODE HERE:
var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';

app.problemCharacters = {
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

app.findProblems = function(string){
  if(string){
    var tempArray = string.split('');

    for(var i=0; i<tempArray.length; i++){
      if(app.problemCharacters[tempArray[i]]){
        //convert!
        tempArray[i] = app.problemCharacters[tempArray[i]];
      }
    }

    var result = tempArray.join('');
    return result;
  }
};

app.appendMessage = function(data){
  var storage = '';

  for(var i = 0; i< data.results.length; i++){
    storage +='<ul class="list-group">' +
    '<li class="list-group-item">' + app.findProblems(data.results[i].text) + '</li>' +
    '<li class="list-group-item">' + app.findProblems(data.results[i].username) + '</li>' +
    '<li class="list-group-item">' + app.findProblems(data.results[i].createdAt) + '</li>' +
    '<li class="list-group-item">' + app.findProblems(data.results[i].roomname) + '</li>' +
    '</ul>';
  }

  $('.messages').html(storage);
};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    dataType: 'json',
    success: function(data){
      console.log(data)
      app.appendMessage(data);
    },
    error: function(){
      console.log('failed :(');
    }
  });
};

app.init = function(){
  app.fetch();
  setInterval(app.fetch, 5000);
};

app.init();

$(document).ready(function(){
  var data = {};
  var username = window.location.search.split('=').pop();
  $('.submit-button').on('click', function(){
    data.text = $('.submission-input').val();
    data.username = username;
    app.send(data);
  });
});

app.send = function(input){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(input),
    contentType: 'application/json',
    success: function(data){
      console.log(':)', data);
    },
    error: function(data){
      console.log(':(', data);
    }
  });

};



























