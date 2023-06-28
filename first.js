console.log("Hello world!");
console.log("1");
console.log(1);
console.log(true);

// Get current date
let now = new Date();
now = {
  hi: "hi",
  bye: "bye"
}

console.log(now);

// Unix 0 (1st January 1970)
const unix0 = new Date(0);
console.log(unix0);

//console.log(now.getTime());

console.log(Object.getOwnPropertyNames(now));

for (let key in now) {
    console.log(key);
}