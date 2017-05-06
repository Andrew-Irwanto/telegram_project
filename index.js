'use strict';

const Telegram = require('telegram-node-bot'),
  tg = new Telegram.Telegram('347958408:AAEOJ58x5QnBdYOtgJodhcX3khF1PIiiroY',{
    workers:1
  });

const TodoController = require('./controllers/todo'),
  OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router.when(new Telegram.TextCommand('/add','addCommand'), todoCtrl)
  .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
  .when(new Telegram.TextCommand('/check', 'checkCommand'), todoCtrl)
  .otherwise(new OtherwiseController());
