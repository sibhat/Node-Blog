// const axios = require('axios');

exports.seed = function(knex, Promise) {
  return knex('users')
    .del() // delete existing users
    .then(function() {
      return knex('users')
      .insert([
        { name: 'Frodo Baggings' }, // 1
        { name: 'Samwise Gamgee' }, // 2
        { name: 'Meriadoc Brandybuck' }, // 3
        { name: 'Peregrin Took' }, // 4
        { name: 'Mithrandir' }, // 5
        { name: 'Boromir' }, // 6
        { name: 'Legolas' }, // 7
        { name: 'Gimly' }, // 8
        { name: 'Aragorn' }, // 9
      ]);
    });
};


// exports.seed = function(knex, Promise) {
//   return knex('users')
//     .del() // delete existing users
//     .then(function() {
//       return fetch('www.google.com')
//             .then(data =>{
//                     knex('users')
//                     .insert(data);
//             })
//             .catch(error => reject(error))
//     });
// };