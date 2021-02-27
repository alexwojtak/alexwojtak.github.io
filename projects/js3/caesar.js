  function caesar() { 

    var str = document.getElementById("name").value;
    var num = document.getElementById("number").value;    
    num = Number(num);

    var alph= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    alph = alph.split('');
    str = str.toUpperCase();
    str = str.split('');
    //Loop through the array
    for (var i = 0; i < str.length; i++){
    //if the letter's index plus num would be above 25, take away 26.

        if (alph.indexOf(str[i]) + num > 25){
            console.log(str[i]);
            str[i] = alph[alph.indexOf(str[i]) - 26 + num];
        }  
    //If the letter's index plus num would be below 25, but not -1 (for other characters), add num and replace with the letter
    else if(alph.indexOf(str[i]) + num < 26 && alph.indexOf(str[i]) != -1){
        str[i] = alph[alph.indexOf(str[i])+num];
    }
    }
    //console.log(str.join(''));
    alert (str.join(''));
    return str.join('');
}
