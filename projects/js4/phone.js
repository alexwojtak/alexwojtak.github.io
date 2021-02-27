function telephoneCheck() {
    var x = document.getElementById("number");
    var num = x.value
    let regexBracket = /\s[0-9]{3}\)|\([0-9]{3}-/;
    if (regexBracket.test(num)){
        alert("Phone Number Invalid");
        return false;
    }
    let regex = /^[1(]?[\s()]?[(]?[0-9]{3}[-()]?[\s]?[0-9]{3}[-)(]?[\s]?[0-9]{4}$/;
    console.log(regex.test(num));

    if (!regex.test(num)){
        alert("Phone Number Invalid");
    }
    else{
        alert("Phone Number Accepted");
    }
    return regex.test(num);
}
