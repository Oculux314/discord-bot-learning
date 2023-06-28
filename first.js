console.log("Hello world!");
console.log("1");
console.log(1);
console.log(true);

// Get current date
now = new Date();
console.log(now);

// Unix 0 (1st January 1970)
unix0 = new Date(0);
console.log(unix0);

// Random date between 1970 and now
randomDate = new Date(Math.random() * now.getTime());
console.log(randomDate);