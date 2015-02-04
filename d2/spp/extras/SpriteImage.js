SPP.SpriteImage=function()
{
	SPP.Particle.call(this);

	this.scale=1;
	this.rotation=0;
	this.alpha=1;
	this.regX=0.5;
	this.regY=0.5;
	this.width=0;
	this.height=0;
};
SPP.inherit(SPP.SpriteImage, SPP.Particle);
SPP.SpriteImage.prototype.update = function()
{
	// USE 3D TRANSFORM MATRIX
	if (SPP.use_3d_matrix == true) {
		this.sprite.style.left = "0px";
		this.sprite.style.top = "0px";
/*
	  var transform = 'matrix(' +
	    SPP.MathUtils.epsilon( Math.cos(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( Math.sin(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( -Math.sin(this.rotation)  ) + ',' +
	    SPP.MathUtils.epsilon( Math.cos(this.rotation) ) + ',' +
	    SPP.MathUtils.epsilon( this.position.x ) + ',' +
	    SPP.MathUtils.epsilon( this.position.y ) +
	  ')';
*/
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

	  	this.sprite.style.left = this.position.x - (this.width * 0.5) + 'px';
	 	this.sprite.style.top = this.position.y - (this.height * 0.5) + 'px';
	  	this.sprite.style.width = this.width*this.scale + 'px';
	  	this.sprite.style.height = this.height*this.scale + 'px';
		this.sprite.style.opacity = this.alpha;
	}

};
SPP.SpriteImage.prototype.init = function(parent, texture, x, y, width, height, life)
{
	SPP.Particle.prototype.init.apply(this,[parent, texture, x, y, width, height, life]);

	this.width=width;
	this.height=height;
};
SPP.SpriteImage.prototype.reset = function()
{
	SPP.Particle.prototype.reset.apply(this);

	this.context=null;
	this.texture=null;
	this.scale=1;
	this.rotation=0;
	this.alpha=1;
	this.regX=0.5;
	this.regY=0.5;
	this.width=0;
	this.height=0;
};
SPP.SpriteImage.prototype.width=function()
{
	return this.width*this.scale;
};
SPP.SpriteImage.prototype.height=function()
{
	return this.height*this.scale;
};
