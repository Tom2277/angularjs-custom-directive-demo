var activeInterval;

function animateCowboy(off){
  console.log("animateCowboy clicked");
  var x = 0, y = 0, vx = 3, vy =3, interval = 200, frame = 0;
  activeInterval = setInterval(moveBox, interval );
  
  function moveBox() {
    x += vx; y += vy;
    $("#cowboy-box").css({ "left":x, "top":y});
    advanceFrame();
  };

  function advanceFrame(){
    frame ++;
    if (frame > 6){ frame = 0};
    var xFrame = (-150 * frame) + "px";
    $("#cowboy-sprite").css("background-position",function(index, current){
      return xFrame + " " + 0;
    });
  }
}

function stopCowboy(){
  clearInterval(activeInterval);
}
