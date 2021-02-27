
//assign list of quotes to an array. 
let quotesList1 = ["Never gonna give you up, ", "We're up all night to have fun, ", "If they move too quick, "];
let quotesList2 = ["never gonna let you down, ", "we're up all night for good fun, ", "oh, ey, oh, "];
let quotesList3 = ["never gonna run around and desert you", "we're up all night to get lucky", "they falling down like a domino"];


function selectQuote(array){
	return(array[Math.floor(Math.random()*array.length)]);
}

let returnedQuote = selectQuote(quotesList1) + selectQuote(quotesList2) + selectQuote(quotesList3);

console.log(returnedQuote);
