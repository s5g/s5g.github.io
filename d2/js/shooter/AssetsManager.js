Shooter.AssetsManager=function()
{
	var _this=this,i=0,j=0;

	this.callback = null;

	this.loader = new createjs.LoadQueue();
	this.loader.useXHR = false;
	this.backgroundArray=[];

	var handleComplete=function()
	{
		var back=Shooter.assets.background;
		for(i=0;i<back.length;i++)
		{
			_this[back[i].id]=_this.loader.getResult(back[i].id);
			_this.backgroundArray.push(_this[back[i].id]);
		};

		_this.callback();

	};

	this.start=function(callback)
	{
		this.callback = callback;
		this.loader.loadManifest(Shooter.assets.background,false);
		this.loader.load();
		this.loader.on("complete", handleComplete, this);
	};

	this.getRandomBackground=function() {
		return this.backgroundArray[this.backgroundArray.length*Math.random()>>0];
	}

};

