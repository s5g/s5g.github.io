FruitGame.Fruit=function()
{
	SPP.Particle.call(this);
};

SPP.inherit(FruitGame.Fruit,SPP.Particle);
FruitGame.Fruit.prototype.update = function()
{
	this.rotation+=this.rotationStep;

	// USE 3D TRANSFORM MATRIX
	if (SPP.use_3d_matrix == true) {
		this.sprite.style.left = "0px";
		this.sprite.style.top = "0px";

	  var transform = 'translate3d(-50%,-50%,0) matrix3d(' +
	    SPP.MathUtils.epsilon( this.scale * Math.cos(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( Math.sin(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( 0 ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( -Math.sin(this.rotation)  ) + ',' +
	    SPP.MathUtils.epsilon( this.scale *Math.cos(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( 0 ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( 1  ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( this.position.x ) + ',' +
	    SPP.MathUtils.epsilon( this.position.y ) + ',' +
	    SPP.MathUtils.epsilon( 0  ) + ',' +
	    SPP.MathUtils.epsilon( 1  ) +
	  ')';

		this.sprite.style.transform = transform;

	// USE BASIC TRANSFORM
	} else {
		if (typeof use_prefixed !== 'undefined' && use_prefixed == 1) {
			this.sprite.style.webkitTransform = "rotate("+SPP.MathUtils.toDegree(this.rotation)+"deg)";
			this.sprite.style.webkitTransformOrigin = (this.regX * 100)+"% "+ (this.regY * 100)+"%";
		} else {
			this.sprite.style.transform = "rotate("+SPP.MathUtils.toDegree(this.rotation)+"deg)";
			this.sprite.style.transformOrigin = (this.regX * 100)+"% "+ (this.regY * 100)+"%";
		}
	  	this.sprite.style.left = this.position.x - (this.texture.width * 0.5) + 'px';
	  	this.sprite.style.top = this.position.y - (this.texture.height * 0.5) + 'px';
	 	this.sprite.style.width = this.texture.width*this.scale + 'px';
	  	this.sprite.style.height = this.texture.height*this.scale + 'px';
		this.sprite.style.opacity = this.alpha;
	}

	if(this.position.y>this.bottomY&&this.bottomY!=null)
	{
		this.life=0;
		return;
	}
	//if(this.onUpdate)this.onUpdate.apply(this);
};
FruitGame.Fruit.prototype.init = function(x,y,life,texture,shadow)
{
 	SPP.Particle.prototype.init.apply(this,[container, texture.src, x, y, texture.width, texture.height, life]);
	this.isCut = false;
	this.texture=texture;
	this.rotation=0;
	this.scale=1;
	this.alpha=1;
	this.radius=texture.width>=texture.height?texture.width*0.5:texture.height*0.5;
	this.radius*=this.scale;
	this.bottomY=null;

	this.rotationStep=(1-SPP.MathUtils.random(2))*0.1;
	if(this.rotationStep<=0)this.rotationStep=-0.1;
	else if(this.rotationStep>0)this.rotationStep=0.1;
};
