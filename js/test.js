//'use strict';
// function test(){
//     console.log(this);
// }

// test();

// const obj = {
//     a : 66,
//     info : function(){
//         console.log(this);
//     }
// };

// obj.info();

// function constr(name,age){
//     this.name = name;
//     this.age = age;
//     console.log(this);
// }

// let test1 = new constr('Dog',18);
// let test2 = new constr('Cat',10);

// class Car{
//     constructor(name, age, status){
//         this.name = name; 
//         this.age = age; 
//         this.status = status;
//     }

//     Info(){
//         console.log(`${this.name} ${this.status}`);
//         console.log(this);
//     }
// }

// class Mersedes extends Car{
//     constructor(name, age,  status, force){
//         super(name, age,  status);
//         this.force = force;
//     }

//     relise(){
//         console.log(this.Info());
//     }
// }

// let one = new Car('Gaga','18','best');
// one.Info();

// let two = new Mersedes('Lond',7,'west', 'power');
// two.relise();

// function sayName(surname){
//     console.log(this);
//     console.log(this.name + " "+surname);
// }

// const obj = {
//     name : "Mike"
// };
// sayName.call(obj, 'Alex');

// function dubble(num){
//     return this * num;
// }
// //const dubble = (num) => this * num;

// const fix = dubble.bind(2);
// console.log(fix(7));

'use strict';
// const btn = document.querySelector('[data-model]');

// btn.addEventListener('click', function(){
//     console.log(this);
// });

// let str = 'abbaa';

// function polindrom(string){
//     string = string.toLowerCase();
//     return string === string.split('').reverse().join('');
// }

// console.group(polindrom(str));

// function testing(a,b){
//     console.log(this);
//     function sum(){
//         console.log(this);
//         return a + b;
//     }

//     console.log(sum());
// }

// testing(3,4);

// const obj = {
//   a : 5,
//   b : 8,
//   sum : function() {
//       console.log(this);
//   }
// };

// console.log(obj);
//console.log(obj.sum());

// function sayName(surname){
//     console.log(this);
//     console.log(this.name + surname);
// }

// const user = {
//   name : 'SONY'
// }

// sayName.call(user, 'Surnt');
// sayName.apply(user);


// console.log('bind');

// function count(n){
//   return this * n;
// }

// const duble = count.bind(2);
// console.log(duble(6));

// function test(as){
//     console.log(this);
//     console.log(this.name1 + as);
// }

// const user = {
//     name1 : 'Tester'
// };

// test.call(user, 'eee');


// function main(name,id){
//     this.name = name;
//     this.id = id;

//     this.log = function(){
//         console.log(this.id);
//     };

//     this.log();
// }

// const test = new main("alx", 20);

// const days = document.querySelector('#days');
// days.addEventListener('click', function() {
//     this.classList.toggle('red');
// });

// class Rectangle {
//     constructor(width,height){
//         this.width = width;
//         this.height = height;
//     }

//     square(){
//         return this.width * this.height;
//     }
// }

// class RectangleTextColor extends Rectangle{
//     constructor(width,height,text,color){
//         super(width,height);
//         this.text = text;
//         this.color = color;
//     }

//     textColor(){
//         console.log(`Color is ${this.color} and width = ${this.width}`);
//     }
// }

// const rtc = new RectangleTextColor(4,7,'Hello','red');
// rtc.textColor();
// console.log(rtc.square());

