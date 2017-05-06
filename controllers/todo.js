'use strict';

const Telegram = require('telegram-node-bot');

class TodoController extends Telegram.TelegramBaseController{
  addHandler($) {
    let todo = $.message.text.split(' ').slice(1).join(' ');

    if(!todo) return $.sendMessage('Sorry, please pass a todo item.');

    $.getUserSession('todos')
    .then(todos => {
      if(!Array.isArray(todos)) $.setUserSession('todos', [todo]);
      else $.setUserSession('todos', todos.concat([todo]));
      console.log(todo);
      $.sendMessage('Added \''+todo+'\' into todo list!');
    });
  }

  getHandler($){
    $.getUserSession('todos').then(todos=>{
      $.sendMessage(this._serializeList(todos), {parse_mode:'Markdown'});
    });

  }

  checkHandler($){
    let index;
    try{
      index = parseInt($.message.text.split(' ').slice(1)[0]);
    }
    catch(e){
      return $.sendMessage('Sorry, you didn\'t pass a valid index');
    }

    $.getUserSession('todos')
      .then(todos => {
        todos.splice(index-1,1);
        $.setUserSession('todos', todos);
        $.sendMessage('Checked todo!');
      });
  }

  get routes(){
    return{
      'addCommand': 'addHandler',
      'getCommand': 'getHandler',
      'checkCommand': 'checkHandler'
    };
  }

  _serializeList(todoList) {
    let serialized = '*Your Todos:*\n\n';
    todoList.forEach((t, i) => {
        serialized += `*${i+1}* - ${t}\n`;
    });
    return serialized;
  }
}

module.exports = TodoController;
