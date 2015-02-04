(function() {
	collide=new FruitGame.Collide();
	collideTest=function()
	{
		var fruits=fruitSystem.getParticles();
		var fruit;

		var blade=bladeSystem.getParticles();
		var l = blade.length

		while (l-- > 1)
		{
			var p1= blade[l];
			var p2=blade[l-1];

			for(var i in fruits)
			{
				fruit = fruits[i];
				var isCut =collide.lineInEllipse
				(
			    	[p1.position.x, p1.position.y],
			    	[p2.position.x, p2.position.y],
			    	[fruit.position.x, fruit.position.y ],
			    	fruit.radius
				);
				if(isCut && fruit.isCut == false)
				{
					cutFruit(fruit);
				};
			}
		};
	};
}());
