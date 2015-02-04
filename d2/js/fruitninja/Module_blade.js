(function() {
  bladeColor = "#00ff00";
  bladeWidth = 10;
  lineLength = function(x, y, x0, y0) {
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
  };
  var buildBlade = function(bcolor, color, bwidth, width) {
    //if (gameState == GAME_OVER)
    //  return;
    var i = bladeSystem.getParticles().length;
    var lineWidth = width;
    var lineSize = 0;
    var step = width / (i - 1);
    while (i-- > 1)
    {
      if (i == 1)
        lineSize = 1;
      else
        lineSize = lineWidth;

      var p = bladeSystem.getParticles()[i];
      var next = bladeSystem.getParticles()[i - 1];
      if (mode != "linear") {
        var length = lineLength(p.position.x,p.position.y,next.position.x,next.position.y);
        var angle  = SPP.MathUtils.atan2D(next.position.y - p.position.y, next.position.x - p.position.x);
        var borderSize = Math.max(1,lineSize * bwidth);
        var posx = (next.position.x + p.position.x) * 0.5;
        var posy = (next.position.y + p.position.y) * 0.5;

        p.sprite.style.borderStyle = "solid";
        p.sprite.style.borderColor = bcolor;
        p.sprite.style.borderWidth =  borderSize + "px 0px "+ borderSize +"px 0px";

        p.sprite.style.backgroundColor = color;
        p.sprite.style.left = posx - (length * 0.5)+ "px";
        p.sprite.style.top = posy - (lineSize + 2 * borderSize) + "px";
        p.sprite.style.width = length + 'px';
        p.sprite.style.height = lineSize+ 'px';
        if (typeof use_prefixed !== 'undefined' && use_prefixed == 1) {
          p.sprite.style.webkitTransform = 'rotate('+angle+'deg)';
        } else {
          p.sprite.style.transform = 'rotate('+angle+'deg)';
        }

      }

      lineWidth -= step
      if (lineWidth <=0)
        lineWidth = 1;

    };
  };
  buildColorBlade = function(color, width) {
    buildBlade(color,"#ffffff", 0.4 ,width * 0.9);
  };
  buildBladeParticle = function(x, y) {
    var p = bladeSystem.createParticle(SPP.Particle);
    p.init(container, "", x, y, 0, 0, 0.2);
  };
}());
