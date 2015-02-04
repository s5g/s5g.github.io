(function() {

	var ui_manualGameUpdate=function()
	{
		this.rotation+=0.01;
	};
	var ui_autoGameUpdate=function()
	{
		this.rotation-=0.01;
	};
	showStartGameUI=function()
	{
		ui_gameTitle = particleSystem.createParticle(SPP.SpriteImage);
    ui_gameTitle.init(container,assetsManager.gametitle.src,(assetsManager.gametitle.width*0.5),(assetsManager.gametitle.height*0.5),assetsManager.gametitle.width,assetsManager.gametitle.height,Infinity);
		ui_gameTitle.regX= ui_gameTitle.regY=0;

		ui_gameTitle.scale = containerWidth / assetsManager.gametitle.width;
		ui_gameTitle.update();

		ui_manualGame = particleSystem.createParticle(SPP.SpriteImage);
		ui_manualGame.init(container,assetsManager.manualgame.src,containerWidth*0.618,containerHeight*0.618,assetsManager.manualgame.width,assetsManager.manualgame.height,Infinity);
		ui_manualGame.scale=1;
		ui_manualGame.alpha=1;
		ui_manualGame.onUpdate=ui_manualGameUpdate;

		ui_autoGame = particleSystem.createParticle(SPP.SpriteImage);
		ui_autoGame.init(container,assetsManager.autogame.src,containerWidth*0.318,containerHeight*0.818,assetsManager.manualgame.width,assetsManager.manualgame.height,Infinity);
		ui_autoGame.scale=1;
		ui_autoGame.alpha=1;
		ui_autoGame.onUpdate=ui_autoGameUpdate;

		ui_manualFruit = fruitSystem.createParticle(FruitGame.Fruit);
		ui_manualFruit.addEventListener("dead",startManualGame);

		var manualObj=assetsManager.getRandomFruit();

		ui_manualFruit.init(containerWidth*0.618,containerHeight*0.618,Infinity,manualObj.w);
		ui_manualFruit.rotationStep=-0.02;
		ui_manualFruit.scale=1;
		ui_manualFruit.alpha=1;
		ui_manualFruit.textureObj=manualObj;

		ui_autoFruit = fruitSystem.createParticle(FruitGame.Fruit);
		ui_autoFruit.addEventListener("dead",startAutoGame);

		var autoObj=assetsManager.getRandomFruit();

		ui_autoFruit.init(containerWidth*0.318,containerHeight*0.818,Infinity,autoObj.w);
		ui_autoFruit.rotationStep=0.02;
		ui_autoFruit.scale=1;
		ui_autoFruit.alpha=1;
		ui_autoFruit.textureObj=autoObj;

	};

  hideStartGameUI=function()
	{
		ui_manualFruit.removeEventListener("dead",startManualGame);
		ui_autoFruit.removeEventListener("dead",startAutoGame);

		ui_manualGame.life = 0;
		ui_autoGame.life = 0;
		ui_gameTitle.life = 0;

		ui_manualFruit.life = 0;
		ui_autoFruit.life = 0;
	};

	showScoreTextUI=function()
	{

		if (!gameStart) return;

		var ui_scoreText = document.getElementById("ui_scoreText");
		var ui_scoreMissText = document.getElementById("ui_scoreMissText");

		ui_scoreText.style.font="72px Courier-Bold";
		ui_scoreText.style.color="rgb(246,194,35)";
		ui_scoreText.style.top = "8px";
		ui_scoreText.style.left = "80px";
		ui_scoreText.textContent = " "+cutResult;

		ui_scoreMissText.style.font="36px Courier-Bold";
		ui_scoreMissText.style.color="rgb(246,194,35)";
		ui_scoreMissText.style.top = "90px";
		ui_scoreMissText.style.left = "10px";
		ui_scoreMissText.textContent = "Miss:"+missResult;

	};

	showScoreUI=function()
	{
		ui_scoreIcon = particleSystem.createParticle(SPP.SpriteImage);
    ui_scoreIcon.init(container,assetsManager.score.src,10+(assetsManager.score.width*0.5),10+(assetsManager.score.height*0.5),assetsManager.score.width,assetsManager.score.height,Infinity);
		ui_scoreIcon.regX=ui_scoreIcon.regY=0;
		ui_scoreIcon.scale=2;
		ui_scoreIcon.update();
	};

	showFpsUI=function(fps)
	{
		var ui_fpsText = document.getElementById("ui_fpsText");

		ui_fpsText.style.font="72px Courier-Bold";
		ui_fpsText.style.color="rgb(246,194,35)";
		ui_fpsText.style.top = "8px";
		ui_fpsText.style.right = "10px";
		ui_fpsText.textContent = fps +" fps";
	};

	showSppUI=function(spp)
	{
		var ui_fpsText = document.getElementById("ui_sppText");

		ui_fpsText.style.font="36px Courier-Bold";
		ui_fpsText.style.color="rgb(246,194,35)";
		ui_fpsText.style.top = "90px";
		ui_fpsText.style.right = "10px";
		ui_fpsText.textContent = spp +" spp";
	};

}());
