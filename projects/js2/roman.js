function convertToRoman(num) 
{
    const romanConversion = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    var x = document.getElementById("name");
    var num = Number(x.value);
    var romanArray = [];   
for (i = 0; i < romanConversion.length; i++){
    while (num >= romanConversion[i][0]){
        romanArray.push(romanConversion[i][1]);
        num -= romanConversion[i][0];
    }
}    
    var romanString = romanArray.join('');
    alert(romanString);
    return romanString;
  }