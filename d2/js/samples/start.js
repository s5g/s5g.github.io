var particleSystem;
var gravity;

function init()
{
    particleSystem = new SPP.ParticleSystem();
    gravity = particleSystem.createForce(SPP.Force);
    gravity.init(0, 0.3);

    initContainer("viewport");
    initTexture("../images/star.png", startHandler);
    initMove(moveHandler);
}

function startHandler()
{
    initStatsBar();
    animate();
    particleSystem.start();
};

function animate()
{
    if (isRunning) requestAnimationFrame(animate);
    particleSystem.render();

    // Update statistics
    updateStatsBar(SPP.Particle.counter);
}

function moveHandler(x,y)
{
    // limit particles number
    if (SPP.Particle.counter + 4 > numParticles) return;

    for (var i = 0; i < 4; i++)
    {
        var p = particleSystem.createParticle(CustomParticle);
        p.init(container, texture.src, x, y, texture.width ,texture.height );

        var brownianForce = particleSystem.createForce(SPP.Brownian);
        brownianForce.init(0.5, Math.random() * 0.5);
        brownianForce.target = p;
        //p.on("dead",deadHandler);
        p.addForce("gravity", gravity);
        p.addForce("brownian", brownianForce);
        p.damp.reset(0.05, 0.05);
        p.velocity.y = -10;

    }
};

function deadHandler(e)
{

}

//Custom your particle.
function CustomParticle()
{
    SPP.Particle.call(this);
};
SPP.inherit(CustomParticle, SPP.Particle);
CustomParticle.prototype.update = function ()
{

    this.scale -= .015;
    if (this.scale < 0)
    {
        this.scale = 0;
        this.life = 0;
    }

    this.sprite.style.width = texture.width*this.scale + 'px';
    this.sprite.style.height = texture.height*this.scale + 'px';
    this.sprite.style.left = this.position.x - (texture.width * .5) + 'px';
    this.sprite.style.top = this.position.y - (texture.height * .5) + 'px';
};
CustomParticle.prototype.init = function (parent, filename, x, y, width, height, life)
{
    SPP.Particle.prototype.init.apply(this, [parent, filename, x, y, width, height, life]);
    this.rotation = 0;
    this.scale = 2;
};
