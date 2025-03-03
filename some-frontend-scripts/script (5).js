const doge = document.querySelector('#dogehead');

function randomDogePosition(doge) {
    const xPosition = Math.floor(Math.random() * (window.innerWidth / 1.3));
    const yPosition = Math.floor(Math.random() * (window.innerHeight / 2) + 250);
    doge.style.top = `${yPosition}px`;
    doge.style.left = `${xPosition}px`;
}

function randomDogeFace(doge) {
    doge.querySelector('img').style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
}

// Store the interval IDs
const positionInterval = setInterval(() => {
    randomDogePosition(doge);
}, 1000);

const faceInterval = setInterval(() => {
    randomDogeFace(doge);
}, 1000);

 
function checkPointRange(clickCount){
    if(clickCount==20){
        clearInterval(positionInterval);
          positionInterval2 = setInterval(() => {
            randomDogePosition(doge);
        }, 900);
  // Displaying a success message
  swal({
    title: "ENTERING LEVEL 2.",
    text: "SPEED INCREASING! LEVEL 3 AT 100 POINTS. *this message will destruct itself in 10 seconds...",
    icon: "success",
    timer: 10000, // 3 seconds
    button: false, // hide the close button
        closeOnClickOutside: false // prevent closing on click away

  });

    }
    
    else if(clickCount==100){
        
         clearInterval(positionInterval);
         clearInterval(positionInterval2);

          positionInterval3 = setInterval(() => {
            randomDogePosition(doge);
        }, 800);
  // Displaying a success message for entering level 3
  swal({
    title: "ENTERING LEVEL 3.",
    text: "SPEED INCREASING! LEVEL 4 AT 500 POINTS. *this message will destruct itself in 10 seconds...",
    icon: "success",
    timer: 10000, // 3 seconds
    button: false, // hide the close button
    closeOnClickOutside: false // prevent closing on click away
  });
    }
    
        else if(clickCount==500){
            
         clearInterval(positionInterval);
         clearInterval(positionInterval2);
         clearInterval(positionInterval3);

          positionInterval4 = setInterval(() => {
            randomDogePosition(doge);
        }, 700);
       swal({
    title: "ENTERING LEVEL 4.",
    text: "SPEED INCREASING! LEVEL 5 AT 1000 POINTS. *this message will destruct itself in 10 seconds...",
    icon: "success",
    timer: 10000, // 3 seconds
    button: false, // hide the close button
    closeOnClickOutside: false // prevent closing on click away
  });
    }
    
            else if(clickCount==1000){
            
         clearInterval(positionInterval);
         clearInterval(positionInterval2);
         clearInterval(positionInterval3);
         clearInterval(positionInterval4);

          positionInterval5 = setInterval(() => {
            randomDogePosition(doge);
        }, 500);
       
                 // Displaying a success message for entering level 5
  swal({
    title: "ENTERING LEVEL 5.",
    text: "SPEED INCREASING LIKE THE DOGE GOING TO THE MOON! THIS IS THE BOSS LEVEL. TO BECOME A BOSS, REACH 10K POINTS. AFTER THAT, YOU WILL BE THE SUPER BOSS, WHATEVER POINT YOU CAN REACH ABOVE THAT. *this message will destruct itself in 20 seconds...",
    icon: "success",
    timer: 20000, // 3 seconds
    button: false, // hide the close button
    closeOnClickOutside: false // prevent closing on click away
  });
    }
    
    
                else if(clickCount==10000){
            
         clearInterval(positionInterval);
         clearInterval(positionInterval2);
         clearInterval(positionInterval3);
         clearInterval(positionInterval4);
         clearInterval(positionInterval5);

          positionInterval6 = setInterval(() => {
            randomDogePosition(doge);
        }, 400);
 
        
     swal({
    title: "CONGRATULATIONS! YOU ARE A SUPER POP THE DOGE BOSS NOW!",
    text: "YOU ARE A SUPER POP THE DOGE BOSS NOW! YOU REACHED 10K POINTS, AND THE MORE YOU EARN FROM NOW, THE MORE OF A BOSS YOU ARE! YOUR SPEED WILL BE STABLE IN THE BOSS SPEED! FROM NOW ON YOUR NEW SPEED IS 400 MS! GOOD LUCK! *this message will destruct itself in 25 seconds...",
    icon: "success",
    timer: 25000, // 3 seconds
    button: false, // hide the close button
    closeOnClickOutside: false // prevent closing on click away
  });
    }
}

let clickCount = 0;
document.querySelector('#dogehead').addEventListener('click', function () {
    clickCount += 1;
    document.querySelector('#counter').innerHTML = clickCount.toString() + " Points";
    // Change hue for half a second when clicked
    doge.querySelector('img').style.filter = 'hue-rotate(24340deg)';
    setTimeout(() => {
        doge.querySelector('img').style.filter = 'none';
    }, 500);
    
    checkPointRange(clickCount);
});



