var Character = require('./character.js');
var connection = require('./connection.js');

//What does a character library do?
//It lets you get all of the characters
//It lets you get a certain character
//It lets you add a character
//It lets you update a character
//It lets you delete a character

//It should also tell you how many characters are in it without letting on how it's storing things

//Notice that we don't ​_care_​ how it does it just yet. This implementation will use an array, but 
//a caller on the outside world won't know or care
//This is the Character Library implementation using a simple array and a "Character" object

module.exports = function(app){

    //It lets you get all of the characters
    this.getAll = function(whatToDoWhenDone)
    {
        var s = 'SELECT * FROM characters';
       connection.query(s, function(err, result) {
            if(err)
            {
                whatToDoWhenDone(err);
            }
            else
            {
                whatToDoWhenDone(null, result);
            }
       });    
   }

    //It lets you get a certain character
    this.get = function(id, whatToDoWhenDone)
    {
        var s = 'SELECT * FROM characters where id=' + id;
       connection.query(s, function(err, result) {

           return result;
       });    
    }

    //It lets you add a character
    this.add = function(name, role, age, force, whatToDoWhenDone)
    {
        var character  = {name: name, role: role, age: age, forcestrength: force};
        var query = connection.query('INSERT INTO characters SET ?', character, function(err, result) {
            if(err) 
            {
                console.log(err);
            }
        });
    }

    //It lets you update a character
    this.update = function(id, name, role, age, force, whatToDoWhenDone)
    {
        var s = "UPDATE characters SET name='" + name + "', role='" + role + "', age="+ age +", forcestrength=" + force + " where id=" + id;
       connection.query(s, function(err, result) {

           return result;
       });    
    }

    //It lets you delete a character
    this.delete = function(id, whatToDoWhenDone)
    {
        var s = 'delete FROM characters where id=' + id;
       connection.query(s, function(err, result) {

           return result;
       });    
    }

    //It should also tell you how many characters are in it without letting on how it's storing things
    this.count = function(){
        var s = 'SELECT count(*) FROM characters';
       connection.query(s, function(err, result) {

           return result;
       });    
    }

}