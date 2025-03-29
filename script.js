const ontro = document.getElementById("ontro");

function ontros() {
   setTimeout(() => {
      ontro.classList.add("fader");
   }, 5000);
   setTimeout(() => {
      ontro.style.display = "none";
   }, 7000);
} 

ontros();
let inText = document.getElementById("inText");
let inPassword = document.getElementById("inPassword");
let inCrypto = document.getElementById("inCrypto");
let outCrypto = document.getElementById("outCrypto");
const toCrypto = document.getElementById("toCrypto");
const toText = document.getElementById("toText");
const clear = document.getElementById("clear");
const clearAll = document.getElementById("clearAll");

let printableAscii = "";
for (let i = 32; i <= 127; i++) {
   printableAscii += String.fromCharCode(i);
}
console.log(printableAscii);

toCrypto.addEventListener("click", function() {
   crypto();
});
toText.addEventListener("click", function () {
   decrypt();
});
clear.addEventListener("click", function () {
   outCrypto.value = "";
});
clearAll.addEventListener("click", function () {
   outCrypto.value = "";
   inCrypto.value = "";
   inText.value = "";
   inPassword.value = "";
});
function getRandomChar() {
   const randomCode = Math.floor(Math.random() * (126 - 32)) + 32;
   return String.fromCharCode(randomCode);
}

function crypto() {
   const inTextValue = inText.value;
   const passwordValue = inPassword.value;
   if (!passwordValue) {
      alert("Write the password!");
      return;
   }

   let encryptedText = "";

   for (let i = 0; i < inTextValue.length; i++) {
      let char = inTextValue[i];
      let asciiCode = char.charCodeAt(0);//h = 104

      let passwordChar/*s = 115*/ = passwordValue[i % passwordValue.length];
      let passwordShift = passwordChar.charCodeAt(0) % 10; /* = 115 : 10 = 11,5 = ,5 = 5*/ 

      if ((i + 1) % 2 !== 0) {//2,4,6+
         asciiCode/*s = 104*/ = (asciiCode/*s = 104*/ + passwordShift/*5*/ + (i/*0*/ + 1)) % 65536; /* = 110 = n*/
      } else {//1,3,5+
         asciiCode = (asciiCode - passwordShift - (i + 1) + 65536) % 65536;
      }

      encryptedText += String.fromCharCode(asciiCode) + getRandomChar();

   }

   outCrypto.value = encryptedText;
}

function decrypt() {
   const inCryptoValue = inCrypto.value;
   const passwordValue = inPassword.value;
   if (!passwordValue) {
      alert("Write the password!");
      return;
   }

   let filteredText = "";
   for (let i = 0; i < inCryptoValue.length; i += 2) {
      filteredText += inCryptoValue[i];//2,4,6+   , 1,3,5 delete
   }

   let decryptedText = "";

   for (let i = 0; i < filteredText.length; i++) {
      let char = filteredText[i];
      let asciiCode = char.charCodeAt(0);

      let passwordChar = passwordValue[i % passwordValue.length];
      let passwordShift = passwordChar.charCodeAt(0) % 10;

      if ((i + 1) % 2 !== 0) { //2,4,6+
         asciiCode = (asciiCode - passwordShift - (i + 1) + 65536) % 65536;
      } else {//1,3,5+
         asciiCode = (asciiCode + passwordShift + (i + 1)) % 65536;
      }

      decryptedText += String.fromCharCode(asciiCode);

   }

   outCrypto.value = decryptedText;
}