// YOUR CODE HERE:
var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.roomname = 'lobby';
app.friends = {};

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

app.filterMessage = function(data, filter){
  var result = '';
  if(filter){
    for(var j = 0; j < data.results.length; j++){
      if(data.results[j].roomname === filter){
        result += app.appendMessage(data.results[j]);
      }
    }
  }else{
    for(var j = 0; j < data.results.length; j++){
      result += app.appendMessage(data.results[j]);
    }
  }

  $('.messages').html(result);
};

app.appendMessage = function(dataResult){
  var storage = '';
  var message = '';
  if(app.friends[dataResult.username]){
    message = 'message';
  }
  storage +='<ul class="list-group">' +
  '<li class="list-group-item ' + message + '">' + app.findProblems(dataResult.text) + '</li>' +
  '<li class="list-group-item"><a class="user">' + app.findProblems(dataResult.username) + '</a></li>' +
  '<li class="list-group-item">' + app.findProblems(dataResult.createdAt) + '</li>' +
  '<li class="list-group-item"><a class="room">' + app.findProblems(dataResult.roomname) + '</a></li>' +
  '</ul>';
  return storage;
};

app.fetch = function(filter){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    dataType: 'json',
    success: function(data){
      app.filterMessage(data, filter);
    },
    error: function(){
      console.log('failed :(');
    }
  });
};
var intervalID;
app.init = function(){
  app.fetch();
  intervalID = setInterval(app.fetch, 5000);
};


$(document).ready(function(){
  app.init();
  var data = {};
  var username = window.location.search.split('=').pop();
  $('.submit-button').on('click', function(){
    data.text = $('.submission-input').val();
    data.username = username;
    data.roomname = app.roomname;
    app.send(data);
  });

  $('.messages').on('click', '.room', function(){
    app.roomname = $(this).text();
    var that = this;
    app.fetch($(this).text());
    clearInterval(intervalID);
    intervalID = setInterval(function(){
      app.fetch($(that).text());
    }, 5000);
  });

  $('.messages').on('click', '.user', function(){
    var friend = $(this).text();
    if(!app.friends[friend]){
      app.friends[friend] = true;
      $('.friends').append(friend);
    }
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




















