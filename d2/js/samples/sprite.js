var particleSystem;
var gravity;

function init()
{
    particleSystem = new SPP.ParticleSystem();
    gravity = new particleSystem.createForce(SPP.Force);
    gravity.init(0, 0.2);

    initContainer("viewport");
    initTexture("../images/s.png", startHandler);
    initMove(moveHandler);
};

function startHandler()
{
    initStatsBar();
    animate();
    particleSystem.start();
    demo();
};

function animate()
{
    if (isRunning) requestAnimationFrame(animate);
    particleSystem.render();

    // Update statistics
    updateStatsBar(SPP.Particle.counter);
}

function demo()
{
    p = particleSystem.createParticle(SPP.SpriteImage);
    p.init(container, texture.src, 200, 300, texture.width ,texture.height);
    p.regX = p.regY = 0;
    p.alpha = 1;
    p.onUpdate = function ()
    {
        this.rotation += 0.1;
    };

    p = particleSystem.createParticle(SPP.SpriteImage);
    p.init(container, texture.src, 400, 300, texture.width ,texture.height);
    p.regX = 0.3;
    p.regY = 0.3;
    p.alpha = 1;

    p = particleSystem.createParticle(SPP.SpriteImage);
    p.init(container, texture.src, 400, 300, texture.width ,texture.height);
    p.regX = 0.3;
    p.regY = 0.3;
    p.alpha = 1;
    p.onUpdate = function ()
    {
        this.rotation += 0.1;
    };

    var alphaStep = 0.01;
    p = particleSystem.createParticle(SPP.SpriteImage);
    p.init(container, texture.src, 600, 300, texture.width ,texture.height);
    p.alpha = 1;
    p.rotation = Math.PI / 0.3;
    p.onUpdate = function ()
    {
        this.rotation += 0.1;
        this.alpha += alphaStep;
        if (this.alpha > 1)
        {
            this.alpha = 1;
            alphaStep *= -1;
        }
        if (this.alpha < 0)
        {
            this.alpha = 0;
            alphaStep *= -1;
        }

    };
}

function SpriteImageUpdate()
{
    this.rotation += 0.1;
    this.scale -= 0.01;
    if (this.scale <= 0)
    {
        this.scale = 0;
        this.life = 0;
    }
};

function moveHandler(x,y)
{

    // limit particles number
    if (SPP.Particle.counter + 2 > numParticles) return;

    for (var i = 0; i < 2; i++)
    {
        var p = particleSystem.createParticle(SPP.SpriteImage);
        p.init(container, texture.src, x, y, texture.width ,texture.height);

        p.alpha = 0.9;
        p.onUpdate = SpriteImageUpdate;
        p.addForce("g", gravity);
        var brownianForce = particleSystem.createForce(SPP.Brownian);
        brownianForce.init(0.3, 0.05);
        p.addForce("brownian", brownianForce);
        p.damp.reset(0.05, 0.05);
        p.velocity.y = -10;
    }
};
