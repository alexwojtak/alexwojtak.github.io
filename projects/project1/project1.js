const fps = 5;
const delay = Math.ceil(1000 / fps);
let octopusArray = [
    [1, 2, 2, 4, 3, 4, 6, 3, 8, 4],
    [5, 6, 2, 1, 1, 2, 8, 5, 8, 7],
    [6, 3, 8, 8, 4, 2, 6, 5, 4, 6],
    [1, 5, 5, 6, 2, 4, 7, 7, 5, 6],
    [1, 4, 5, 1, 8, 1, 1, 5, 7, 3],
    [1, 8, 3, 2, 3, 8, 8, 1, 2, 2],
    [2, 7, 4, 8, 5, 4, 5, 6, 4, 7],
    [2, 5, 8, 2, 8, 7, 7, 4, 3, 2],
    [3, 1, 8, 5, 6, 4, 3, 8, 7, 1],
    [2, 2, 2, 4, 8, 7, 6, 6, 2, 7]
];

// let octopusArray = [
//     [5,4,8,3,1,4,3,2,2,3],
//     [2,7,4,5,8,5,4,7,1,1],
//     [5,2,6,4,5,5,6,1,7,3],
//     [6,1,4,1,3,3,6,1,4,6],
//     [6,3,5,7,3,8,5,4,7,8],
//     [4,1,6,7,5,2,4,6,4,5],
//     [2,1,7,6,8,4,1,7,2,1],
//     [6,8,8,2,8,8,1,1,3,4],
//     [4,8,4,6,8,4,8,5,5,4],
//     [5,2,8,3,7,5,1,5,2,6]
// ];

let flashArray = [];
flashArray.length = 10;
flashArray.fill([]);
for(let i=0; i<10; i++){
    flashArray[i].length = 10;
    flashArray[i].fill(false);
}

let flashCounter = 0;
let flashReset = true;
let generation = 0;
let squarepostion = 80;

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

function drawOctopus(x, y, intensity){
    let offset = 100;

    let octopusColour = "#" + intensity + intensity + "0000";

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = octopusColour;
    ctx.rect(offset + 20*y, offset + 20*x, 5, 5);
    ctx.stroke();
}

function drawRealOctopus(x, y, intensity)
{
    let offset = 100;
    x *= 31;
    y *= 31;
    x += offset;
    y += offset;
    base_image = new Image();
    base_image.src = 'dumbosprites.png';
    base_image.onload = function(){
    ctx.drawImage(base_image, intensity*31, 0, 32, 32, x, y, 32, 32);
  }
}

function pruned(arrayToPrune, limitingArray){
    for(let i = (arrayToPrune.length -1); i>=0; i--){
        if(arrayToPrune[i][0] < 0){
            arrayToPrune.splice(i, 1);
        }
        else if(arrayToPrune[i][1] < 0){
            arrayToPrune.splice(i, 1);
        }
        else if(arrayToPrune[i][0] >= limitingArray.length){
            arrayToPrune.splice(i, 1);
        }
        else if(arrayToPrune[i][1] >= limitingArray[0].length){
            arrayToPrune.splice(i, 1);
        }
    }
    return arrayToPrune;
}

function makeEverythingValidAroundMeOneGreater(x, y){
    let myList = [
        [(x-1),(y-1)],
        [(x-1),y],
        [(x-1),(y+1)],
        [x,(y-1)],
        [x,(y+1)],
        [(x+1),(y-1)],
        [(x+1),y],
        [(x+1),(y+1)]
    ];
    //remove everything out of bounds;
    myList = pruned(myList, octopusArray);
    //console.log(JSON.stringify(myList));
    //Add main array values
    for(let i = 0; i<myList.length; i++){
        //if(!flashArray[myList[i][0]][myList[i][1]]){
        if(octopusArray[myList[i][0]][myList[i][1]] !== 0){
            octopusArray[myList[i][0]][myList[i][1]]++;
        }
    }
}

function draw() {
    // drawing code

    ctx.clearRect(0, 0, 500, 500);
    
    //reset flash array
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            flashArray[i][j] = false;
        }
    }
    for(let i=0; i<octopusArray.length; i++){
        for(let j=0; j<octopusArray[i].length; j++){
            //drawOctopus(i, j, octopusArray[i][j]);
            drawOctopus((i), (j), octopusArray[i][j]);
        }
    }

    //Gain energy
    for(let i=0; i<octopusArray.length; i++){
        for(let j=0; j<octopusArray[i].length; j++){
            if(octopusArray[i][j]<10){
                octopusArray[i][j]++;
            }
        }
    }

    //If any value is above 9, increment all values next to it, then set it to 0

    flashReset = true;
    while(flashReset){
        flashReset= false;

        for(let i=0; i<octopusArray.length; i++){
            for(let j=0; j<octopusArray[i].length; j++){
                //If we find a point with intensity about 9, the octopus will flash
                if(octopusArray[i][j]>9){
                    //We increment the counter of the total number of flashes
                    flashCounter++;
                    //The flash makes all surrounding optopodes get one brighter, unless they have already flashed 
                    makeEverythingValidAroundMeOneGreater(i, j);
                    //console.log("To be clear, flashArray " + i + ", " + j + " is flagged, as " + octopusArray[i][j] + " is greater than 9" )
                    
                    //Reset the intensity of this Octopus to zero
                    octopusArray[i][j] = 0;
                    //mark down in the 'flash array' that this octopus has flashed this turn
                    flashArray[i][j] = true;
                    
                    //Set the flashReset flag so we repeat this loop at least once more.
                    flashReset = true;
                }
            }
        }

    }

    //draw a cool little falling square
    squarepostion++;
    if(squarepostion>300){
        squarepostion = 0;
    }

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "#0000FF";
    ctx.rect(60, squarepostion, 5, 5);
    ctx.stroke();

    document.getElementById("flashCounter").innerHTML = "After step " + (generation + 1) + " \n number of flashes is " + flashCounter;
    if(generation < 3){
        console.log(JSON.stringify(octopusArray))
        console.log(generation)
    }
    if(generation === 39){
        document.getElementById("permanentResponse").innerHTML = "After step " + (generation+1) + " there have been " + flashCounter + " flashes";
    }
    generation++;

}
setInterval(draw, delay);
