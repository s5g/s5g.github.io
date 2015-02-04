var fpsmeter;
var framecounter = 0;
var sppold = 0;
var sppcounter = 0;
var spptotal = 0;

function init()
{
    initContainer("viewport");

    // Enable matrix mode
    SPP.use_3d_matrix = matrix ? true : false;

    container.addEventListener('mousemove', mousemove, false);
    container.addEventListener('touchmove', touchmove, false);
    moveCallback = moveHandler;

    var outer = document.getElementById("outer");
    if (rotate > 0) {
        outer.style.width = "980px";
        outer.style.height = "1742px";

        container.style.width = "1742px";
        container.style.height = "980px";
        container.style.top = "0";
        container.style.left = "100%";
        if (typeof use_prefixed !== 'undefined' && use_prefixed == 1) {
            container.style.webkitTransform = "rotate(90deg)";
            container.style.webkitTransformOrigin = "left top";
        } else {
            container.style.transform = "rotate(90deg)";
            container.style.transformOrigin = "left top";
        }
    } else {
        outer.style.width = "100%";
        outer.style.height = "100%";

        container.style.width = "100%";
        container.style.height = "100%";
        container.style.top = "0";
        container.style.left = "0";
    }

    assetsManager=new FruitGame.AssetsManager();
    assetsManager.addEventListener("complete",startHandler);
    assetsManager.start();
};

function startHandler()
{
    //initStatsBar();

    fpsmeter = new FPSMeter();

    initResize(resizeHandler);

    resize(0);

    //particle system
    particleSystem=new SPP.ParticleSystem();
    bladeSystem=new SPP.ParticleSystem();
    fruitSystem=new SPP.ParticleSystem();
    gravity =new SPP.Force();
    gravity.init(0,0.15);

    particleSystem.start()
    bladeSystem.start();
    fruitSystem.start();
    render();

    if (autostart) {
        container.removeEventListener('mousemove');
        container.removeEventListener('touchmove');

        showScoreUI();
        mode = "linear";

        randomstart = new Date().getTime();
        gameStart = true;
    } else
        showStartGameUI();

};

function startManualGame() {
    hideStartGameUI();
    showScoreUI();
    mode = "manual";

    //randomstart = new Date().getTime();
    gameStart = true;
}

function startAutoGame() {
    container.removeEventListener('mousemove');
    container.removeEventListener('touchmove');

    hideStartGameUI();
    ui_manualFruit.render();
    showScoreUI();
    mode = "linear";

    randomstart = new Date().getTime();
    gameStart = true;
}

function renderTimer()
{
    if (!gameStart) return;

    if (framecounter%120 == 0)
        throwObject();
    /*
    timer+=SPP.frameTime;
    if(timer>=interval) {
        timer=0;
        throwObject();
    }*/

};

function throwObject()
{
    var n = SPP.MathUtils.random(4) + 1;

    var fruits=fruitSystem.getParticles();

    for(var i=0;i<n;i++)
    {
        if (SPP.Particle.counter < numParticles)
            throwFruit();
    };
}

function render()
{
    framecounter ++;
    if (isRunning) requestAnimationFrame(render);

    if ( (mode == "auto" || mode == "linear" /*|| mode == "manual"*/) && !randomfinish && gameStart) {
        if (mode == "auto")
            randommove();
        else if (mode == "linear")
            randomlinearmove();

        if (delay > 0) {
            if(new Date().getTime() - randomstart > delay * 1000){
                randomfinish = true;
                isRunning = false;
            }
        }
    }

    showScoreTextUI();

    particleSystem.render()
    fruitSystem.render();
    bladeSystem.render();

    buildColorBlade(bladeColor,bladeWidth);

    renderTimer();
    collideTest();

    if (!gameStart) return;

    // Update statistics
    //updateStatsBar(SPP.Particle.counter);
    fpsmeter.update();

    if (SPP.Particle.counter != sppold && SPP.Particle.counter > 0) {
        sppcounter++;
        spptotal += SPP.Particle.counter;
        sppold = SPP.Particle.counter;
    }


    var fps = fpsmeter.fpsAvg();
    if (isNaN(fps))
        fps = fpsmeter.fps();

    if (fps > 0) {
        showFpsUI(fps);
        showSppUI((spptotal/sppcounter).toFixed(1));
    }
    //var res = document.getElementById("result");
    //res.textContent = "SCORES : "+(cutResult+missResult)+" / "+cutResult+" / "+missResult;
}

function moveHandler(x,y)
{
    if (rotate > 0 && mode != "linear")
        buildBladeParticle(y, containerHeight-x);
    else
        buildBladeParticle(x,y);
};

function resizeHandler(w,h)
{
    //document.getElementById("stats").style.width = containerWidth + 'px';
    //document.getElementById("particlesstats").style.width = containerWidth + 'px';
    //document.getElementById("result").style.width = containerWidth + 'px';
};
