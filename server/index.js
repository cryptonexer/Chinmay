var md5 = require('md5');
var aes256 = require('aes256');

var key = "Testing Encryption";
var Name = "Chinmay";

console.log("Aes: "+aes256.encrypt(key, Name));
console.log("MD5: "+md5(Name));