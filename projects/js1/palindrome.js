function palindrome() {
    var x = document.getElementById("survey-form");
    var text = "";
    var answer = x.elements[0].value;
    answer = answer.replace(/[\W_]/g, "").toLowerCase();
    var reverse = answer.split('').reverse().join(''); 
    if (answer === reverse){
        alert("This is a palindrome");
    }
    else{
        alert("This is not a palindrome")
    }
  }