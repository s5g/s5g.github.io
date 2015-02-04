(function() {

	//jucie
	var juiceUpdate=function()
	{
		this.scale-=0.013;
		if(this.scale<0)
		{
			this.scale=0;
			this.life=0;
		}
	};
	var buildJuice=function(target,juiceCount)
	{
		for(var i=0;i<juiceCount;i++)
		{
			if  (SPP.Particle.counter > numParticles) break;

			var juice = particleSystem.createParticle(SPP.SpriteImage);
			juice.init(container,target.textureObj.j.src,target.position.x,target.position.y,target.textureObj.j.width,target.textureObj.j.height,Infinity);

			juice.onUpdate=juiceUpdate;
			juice.scale=Math.random() * 0.7;
			juice.damp.reset(0, 0);
			juice.velocity.reset(0, -(4 + SPP.MathUtils.random(4)));
			juice.velocity.rotate(SPP.MathUtils.random(360));
			juice.addForce("g", gravity);
		}
	};
	//splash
	var splashUpdate=function()
	{
		this.alpha-=0.005;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		};
	};
	var buildSplash =function(target)
	{
		var splash = particleSystem.createParticle(SPP.SpriteImage);
		splash.init(container,target.textureObj.s.src,target.position.x,target.position.y,target.textureObj.s.width,target.textureObj.s.height,Infinity);

		splash.onUpdate=splashUpdate;
		splash.scale=1+SPP.MathUtils.random(1);
		splash.rotation = SPP.MathUtils.random(Math.PI*2);

	};
	var  buildHalfFruit=function(target)
	{
		var speed= 1 + SPP.MathUtils.random(3);

		var right = particleSystem.createParticle(FruitGame.Fruit);
		right.init(target.position.x,target.position.y,Infinity,target.textureObj.r);
		right.velocity.reset(0, -speed);
		right.velocity.rotate(SPP.MathUtils.random(20));
		right.damp.reset(0, 0);
		right.rotation=target.rotation;
		right.bottomY=containerHeight+target.textureObj.r.height;
		right.addForce("g", gravity);

		var left = particleSystem.createParticle(FruitGame.Fruit);
		left.init(target.position.x,target.position.y,Infinity,target.textureObj.l);
		left.velocity.reset(0, -(speed));
		left.velocity.rotate(-SPP.MathUtils.random(20));
		left.damp.reset(0, 0);
		left.rotation=target.rotation;
		left.bottomY=containerHeight+target.textureObj.l.height;
		left.addForce("g", gravity);
	};
	//if miss fruit
	var missUpdate=function()
	{
		this.alpha-=0.01;
		if(this.alpha<0)
		{
			this.alpha=0;
			this.life=0;
		}
	};
	var missFruit=function(target)
	{
		var lose = particleSystem.createParticle(SPP.SpriteImage);
		var x=target.position.x;
		if(x<=0)x=40;
		if(x>containerWidth)x=containerWidth-40;
		lose.init(container,assetsManager.miss.src,x,containerHeight-assetsManager.miss.height,54,50,Infinity);
		lose.velocity.reset(0,-2);
		lose.damp.reset(0.01,0.01);
		lose.onUpdate=missUpdate;
	};

	//throw fruit
	throwFruit=function()
	{
		var textureObj=assetsManager.getRandomFruit();
		var p = fruitSystem.createParticle(FruitGame.Fruit);
    p.init(containerWidth*0.5+(1-SPP.MathUtils.random(2))*300, containerHeight+textureObj.w.height,Infinity,textureObj.w);

		p.velocity.reset(0, -(12 + SPP.MathUtils.random(3)));
		p.velocity.rotate(8 - SPP.MathUtils.random(16));
		p.damp.reset(0, 0);
		p.addForce("g", gravity);
		p.addEventListener("dead",missHandler);
		p.textureObj=textureObj;
		p.bottomY=containerHeight+textureObj.w.height;
	};
	//cut fruit
	cutFruit=function(target)
	{
		//
		cutResult ++;

		target.isCut = true;
		target.alpha=0;
		target.life=0;
		target.removeEventListener("dead",missHandler);

		buildHalfFruit(target);
		buildJuice(target,SPP.MathUtils.random(30)+30);
		buildSplash(target);
	};
	missHandler=function(e)
	{
		//
		missResult ++;

		e.target.removeEventListener("dead",missHandler);

		missFruit(e.target);
	};

}());
