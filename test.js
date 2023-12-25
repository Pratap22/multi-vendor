//a
//b
//c -> exception/error
//d
// e
// f

// console.log(a);
// console.log("Pratap");
const data = `{"name":"Yogesh","age:20}`;

try {
  console.log(JSON.parse(data));
} catch (error) {
  console.log(error);
}
// e
// f
console.log("Pratap");
