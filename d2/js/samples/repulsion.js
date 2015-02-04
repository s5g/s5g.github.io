var particleSystem;
var boundary;
var repulsionForce;
var zone;
var mouse;

function init()
{

  initContainer("viewport");

  particleSystem = new SPP.ParticleSystem();

  mouse = new SPP.Vector2D();
  repulsionForce = particleSystem.createForce(SPP.Repulsion);
  repulsionForce.init(mouse, 5, 300);

  zone = new SPP.Zone();
  zone.boundary=new SPP.Rectangle(0,0,containerWidth,containerHeight);

  initTexture("../images/arrow.png", startHandler);
  initMove(moveHandler);
  initResize(resizeHandler);
}

function startHandler()
{
    initStatsBar();
    animate();
    particleSystem.start();
    initParticles();
};

function animate()
{
  if (isRunning) requestAnimationFrame(animate);
  particleSystem.render();

  // Update statistics
  updateStatsBar(SPP.Particle.counter);
}

function resizeHandler(width, height)
{
  zone.boundary.width = width;
  zone.boundary.height = height;
}

function initParticles()
{
  for ( var i = 0; i < numParticles; i++)
  {
    var p = particleSystem.createParticle(SPP.SpriteImage);
    p.init(container, texture.src, containerWidth * 0.5, containerHeight * 0.5, texture.width ,texture.height);

    p.zone=zone;
    var brownianForce =particleSystem.createForce(SPP.Brownian);
    brownianForce.init(0.5, Math.random()*2+1);
    p.addForce("brownianForce",brownianForce);
    p.addForce("repulsionForce", repulsionForce);
    p.onUpdate=arrowUpdate;
  }
};

function arrowUpdate()
{
   this.rotation=SPP.MathUtils.toRadian(this.velocity.getAngle());
};

function moveHandler(x,y)
{
  mouse.x = x;
  mouse.y = y;
};
