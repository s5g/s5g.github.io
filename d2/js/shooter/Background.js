Shooter.Background=function()
{
  this.sprite = null;
  this.texture = null;
  this.position = 0;
};

Shooter.Background.prototype.update = function()
{
  this.position += this.velocity;
  this.sprite.style.top = this.position  + 'px';

  if (this.position > containerHeight) this.moveToTop();
};

Shooter.Background.prototype.init = function()
{
  this.texture = assetsManager.getRandomBackground();

  if (this.texture.src.indexOf("nebula") > -1) {
    this.velocity = 10;
    this.zIndex = 20;
  } else if (this.texture.src.indexOf("starBig") > -1) {
    this.velocity = 8;
    this.zIndex = 15;
  } else if (this.texture.src.indexOf("starSmall") > -1) {
    this.velocity = 6;
    this.zIndex = 5;
  }
  console.info(this.texture.src);

  // Create Sprite
  this.sprite = document.createElement("div");
  this.sprite.className = 'sprite';

  this.sprite.style.backgroundImage = "url(" + this.texture.src + ")";
  this.sprite.style.backgroundSize = "100%";
  this.sprite.style.width = this.texture.width + 'px';
  this.sprite.style.height = this.texture.height + 'px';
  this.sprite.style.zIndex=this.zIndex;

  container.appendChild(this.sprite);

  this.moveToTop();
};

Shooter.Background.prototype.moveToTop = function(){
  this.sprite.style.left = 0 + Math.random() * (containerWidth - this.texture.width) + 'px';
  this.position = Math.random() * this.texture.height * 0.5 * 100;
  this.position = -this.texture.height-this.position;
  this.sprite.style.top =  this.position+'px';
}
