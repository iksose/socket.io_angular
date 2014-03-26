/* jshint esnext:true */


angular.module('uiRouterSample')
.controller("ecmascript6_controller" ,function ($scope, errors) {
  console.log("Hello from es6");


class Vehicle {
  constructor( name, year ) {
  this.name = name;
  this.year = year;
  }

  summary() {
    return "This vehicle's name is " + this.name + " and it was manufactured in " + this.year;
  }
}

  var charles = new Vehicle("Charles", "1964");
  console.log(charles.summary());


  var numbers = [1, 4, 9];
  var roots = numbers.map(Math.sqrt);
  console.log(numbers, roots);

  var evens = [2,4,6,8, 10, 12, 14];
  var odds = evens.map(v => v + 1);
  var nums = evens.map((v, i) => v + i);
  console.log(odds);
  console.log(evens);


  var fives = [];
  // Statement bodies
  nums.forEach(v => {
    if (v % 5 === 0)
      fives.push(v);
  });

  console.log("Nums ", nums);

  console.log("Fives ", fives);

  // Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

bob._friends.push("Kyle");

console.log(bob.printFriends());


function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
console.log(f(3, "hello", true) == 6);

let x = "inner";

console.log("Ex wow ", x);

let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      }
    };
  }
}


for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 5000)
    break;
    console.log(n);
}

// const iterable = {
//   *[Symbol.iterator]() {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// }

// for (let x of iterable) {
//   console.log(x);
// }


// let articleParagraphs = document.querySelectorAll("article > p");
//
// console.log("Let article", articleParagraphs);
//
//
// for (let paragraph of articleParagraphs) {
//   paragraph.classList.add("read");
// }




})
