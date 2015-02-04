FruitGame.AssetsManager=function()
{
	SPP.EventDispatcher.call(this);
	var _this=this,i=0,j=0;
	var fruitsDir="../images/fruitninja/";
	var fruitStateLabels=["w","l","r","s","j"];
	var fruitImageType=".png";

	this.fruitsObj={};
	this.fruitsArray=[];
	this.images={};
	this.loader = new createjs.LoadQueue();
	this.loader.useXHR = false;
	var handleComplete=function()
	{
		var fruits=FruitGame.assets.fruits;
		for(i=0;i<fruits.length;i++)
		{
			var obj={};
			for(j=0;j<fruitStateLabels.length;j++)
			{
				obj[fruitStateLabels[j]]=_this.loader.getResult(fruits[i]+fruitStateLabels[j]);
			}
			_this.fruitsArray.push(obj);
			_this.fruitsObj[fruits[i]]=obj;
		}
		var other=FruitGame.assets.other;
		for(i=0;i<other.length;i++)
		{
			_this[other[i].id]=_this.loader.getResult(other[i].id);
		};
		_this.dispatchEvent(new SPP.Event("complete"));
	};
	this.loader.addEventListener("complete", handleComplete);

	this.start=function()
	{
		var fruits=FruitGame.assets.fruits;
		for(i=0;i<fruits.length;i++)
		{
			for(j=0;j<fruitStateLabels.length;j++)
			{
				this.loader.loadFile(
				{
					id:fruits[i]+fruitStateLabels[j],
					src:fruitsDir+fruits[i]+"-"+fruitStateLabels[j]+fruitImageType
				},false);

				console.info("Load : "+fruitsDir+fruits[i]+"-"+fruitStateLabels[j]+fruitImageType);
			}
		};

		this.loader.loadManifest(FruitGame.assets.other,false);
		this.loader.load();
	};
	this.getRandomFruit=function()
	{
		return this.fruitsArray[this.fruitsArray.length*Math.random()>>0];
	};
};
SPP.inherit(FruitGame.AssetsManager,SPP.EventDispatcher);
