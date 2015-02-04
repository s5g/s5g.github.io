var containerWidth;
var containerHeight;
var container;
var stats;
var particlesstats;
var texture;
var moveCallback = null;
var resizeCallback = null;

var randomtexture;
var randomposition = {};
var randomposstart = {};
var randomposend = {};
var randomstart = 0;
var randomfinish = false;

var isRunning = true;

(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();
(function(){Math.epsilon=function(a){return Math.abs(a)<0.000001?0:a;}})();

window.addEventListener('resize', resize, false);

var transformCSSMatrix = function ( tx, ty, r ) {

    var transform = 'translate3d(-50%,-50%,0) matrix3d(' +
        Math.epsilon( Math.cos(r)  ) + ',' +
        Math.epsilon( Math.sin(r) ) + ',' +
        Math.epsilon( 0 ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( -Math.sin(r)  ) + ',' +
        Math.epsilon( Math.cos(r)  ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( 0 ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( 1  ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( tx ) + ',' +
        Math.epsilon( ty ) + ',' +
        Math.epsilon( 0  ) + ',' +
        Math.epsilon( 1  ) +
    ')';

    return transform;
};

/*
*
*/
function initContainer(nameId)
{
    container = document.getElementById(nameId);

    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;

    randomposstart.x = 0;
    randomposstart.y = 0;
    randomposend.x = 0;
    randomposend.y = 0;
    randomposition.x = -1;
    randomposition.y = -1;

    if (mode == "auto") {
        randomposition.x = parseInt(containerWidth * 0.5);
        randomposition.y = parseInt(containerHeight * 0.5);

        var sprite = document.createElement("div");
        sprite.id = "randomimg";
        sprite.className = 'sprite';
        sprite.style.backgroundImage = "url(../images/circle.png)";
        sprite.style.backgroundSize = "100%";
        sprite.style.left = randomposition.x - 16 + 'px';
        sprite.style.top = randomposition.y - 16 + 'px';
        sprite.style.width = 32 + 'px';
        sprite.style.height = 32 + 'px';

        container.appendChild(sprite);
    }
};

/*
* Interface Stats
*/
function initStatsBar()
{
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    particlesstats = new ParticlesStats(numParticles);
    particlesstats.domElement.style.position = 'absolute';
    particlesstats.domElement.style.top = '27px';
    container.appendChild(particlesstats.domElement);
};

/*
* Load texture and init
*/
function initTexture(texturePath,callback)
{
    texture = new Image();
    texture.src = texturePath;
    texture.onload = function() {
        callback();
    };
};

/*
*
*/
function initMove(callback)
{
    if (mode == "manual") {
        container.addEventListener('mousemove', mousemove, false);
        container.addEventListener('touchmove', touchmove, false);
    } else {
        randomstart = new Date().getTime();
    }

    moveCallback = callback;
};

/*
*
*/
function initResize(callback)
{
    resizeCallback = callback;
};


/*
*
*/
function updateStatsBar(particles)
{
    if ( (mode == "auto" || mode == "linear") && !randomfinish) {

        if (delay > 0) {
            if(new Date().getTime() - randomstart > delay * 1000){
                randomfinish = true;
                isRunning = false;
                return;
            }
        }
        if (mode == "auto")
            randommove();
        else
            randomlinearmove()

        stats.update();
    } else if (mode == "manual") {
        stats.update();
    }

    particlesstats.update(particles);
};

/*
*
*/
function randommove(e)
{
    var xorient = ( Math.floor(Math.random() * containerWidth) / containerWidth ) - 0.5;
    var yorient = ( Math.floor(Math.random() * containerHeight) / containerHeight ) - 0.5;

    randomposition.x += xorient * 50;
    randomposition.y += yorient * 50;

    randomposition.x = Math.clamp(randomposition.x,0,containerWidth);
    randomposition.y = Math.clamp(randomposition.y,0,containerHeight);

    var sprite = document.getElementById("randomimg");
    sprite.style.left = randomposition.x - 16 + 'px';
    sprite.style.top = randomposition.y - 16 + 'px';

    if (moveCallback != null)
        moveCallback(randomposition.x,randomposition.y);
};

/*
*
*/
function randomlinearmove(e)
{
    // If randomposition(-1,-1) compute random start / end
    if (randomposition.x == -1 && randomposition.y == -1) {
        var offsetx =parseInt( Math.floor(Math.random() * containerWidth) * 0.2 );

        randomposstart.x = offsetx;
        randomposend.x = containerWidth - offsetx;

        var offsety = parseInt( containerHeight - Math.floor(Math.random() * containerHeight) * 0.4 );

        randomposstart.y = offsety;
        randomposend.y = offsety;

        randomposition.x = randomposstart.x;
        randomposition.y = randomposstart.y;
    }

    randomposition.x += parseInt(containerWidth * 0.02) ;

    if (randomposition.x >= randomposend.x && randomposition.y == randomposend.y ) {
        randomposition.x = -1;
        randomposition.y = -1;
    }

    if (moveCallback != null && randomposition.x != -1 && randomposition.y != -1)
        moveCallback(randomposition.x,randomposition.y);
};

/*
*
*/
function mousemove(e)
{
    if (moveCallback != null)
        moveCallback(e.pageX,e.pageY);
};

/*
*
*/
function touchmove(e)
{
    e.preventDefault();
    var touch = e.touches[0];

    if (moveCallback != null)
        moveCallback(touch.pageX,touch.pageY);
};

/*
*
*/
function resize(e)
{
    containerWidth = container.offsetWidth;
    containerHeight = container.offsetHeight;

    if (resizeCallback != null)
        resizeCallback(containerWidth,containerHeight);
};
