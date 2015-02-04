var assetsManager;

// Move ship
var rightKey    = false;
var leftKey     = false;
var upKey       = false;
var downKey     = false;

var backgroundObj = [];

/*
*
*/
function init()
{
    console.info("Res : "+document.body.offsetWidth+ " x "+document.body.offsetHeight);

    initContainer("viewport");
    initMove();

    assetsManager = new Shooter.AssetsManager();
    assetsManager.start(start);
}

function start() {

    initStatsBar();

    document.getElementById("stats").style.width = containerWidth + 'px';
    document.getElementById("particlesstats").style.width = containerWidth + 'px';

    var bgDensity = numParticles;

    for (var j=0; j<bgDensity; j++) {
      var back = new Shooter.Background();
      back.init();
      backgroundObj[j] = back;
    }

    requestAnimationFrame(update);
}

/*
*
*/
function update() {

    if (isRunning) requestAnimationFrame(update);

    for (var i = 0; i < backgroundObj.length; i++) {
      backgroundObj[i].update();
    }

    // Update statistics
    updateStatsBar(numParticles);


}
