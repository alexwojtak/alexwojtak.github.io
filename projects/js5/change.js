function checkCashRegister() {
    var price = 19.5;
    var cash = 20;
    var cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
    var change;
    var moneyBack = 100*(cash - price);
    var denominations = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
    var tempCash = [];
    var x = 0;
    var y;
    var HMMCWGBATPD;
    var output = {status: null, change: []};
    //First, check if the change equals the total cash (change this to use .reduce)
    //Get the total in the till
    var tillTotal = 0;
    for (var i = 0; i < denominations.length; i++){
        tillTotal += cid[i][1];
        }
    //Check if the till total === change
    if (Math.floor(100*tillTotal) === moneyBack){
        output.status = "CLOSED";
        output.change = cid;
        alert(output.change);
        return(output);
    }
    //Check the obvious case of insufficient funds; the change is greater than the till money
    if (Math.floor(100*tillTotal) < moneyBack){
        alert(output.change);
        return({status: "INSUFFICIENT_FUNDS", change: []});
        }
    //Start a loop to go through the array of money
    for (var i = denominations.length - 1 ; i >= 0; i--){
    // cid[i][0] - The name of the denomination (e.g. 'quarter')
    // cid[i][1] - Value at that denomination, in dollars
    // denominations[i] - value of one unit of that denomination
    // 100 * (cid[i][1]/denominations[i]) - How many of a denomination we have
    // Math.floor(moneyBack/denominations[i]) - How many of that denomination we are handing back as change
    // denominations[i] * Math.floor(moneyBack/denominations[i]) - cash value of what we are handing over at that denomination.
        if (denominations[i] < moneyBack){  //Is this denomination useful?
            if (100*cid[i][1] > moneyBack){ //Are we limited by the amount available at this denomination?
            HMMCWGBATPD = denominations[i] * Math.floor(moneyBack/denominations[i]);
        }
        else{
            HMMCWGBATPD = 100 * cid[i][1];
        }
        moneyBack -= HMMCWGBATPD;
        y = cid[i][0]; //the denomination name
        tempCash.push([y, HMMCWGBATPD/100]); //Pushing denomination name and change amount to tempCash
        }
    }
    if (moneyBack === 0){
        output.status = "OPEN";
        output.change = tempCash;
        alert(output.change);
        return(output);
    }
    // Here is your change.
    alert (change.change);
    return ({status: "INSUFFICIENT_FUNDS", change: []});
}
//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
//var answer = (checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
//console.log(answer.change);