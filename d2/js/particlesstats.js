var ParticlesStats = function (maxParticles) {

  var particles = 0, particlesMax = maxParticles;

  var container = document.createElement( 'div' );
  container.id = 'particlesstats';
  container.style.cssText = 'width:100%;opacity:0.9;cursor:pointer';

  var particlesDiv = document.createElement( 'div' );
  particlesDiv.id = 'particlesnum';
  particlesDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
  container.appendChild( particlesDiv );

  var particlesText = document.createElement( 'div' );
  particlesText.id = 'particlesText';
  particlesText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:24px';
  particlesText.innerHTML = 'SPRITES';
  particlesDiv.appendChild( particlesText );

  /*
  var particlesGraph = document.createElement( 'div' );
  particlesGraph.id = 'particlesGraph';
  particlesGraph.style.cssText = 'position:relative;width:174px;height:78px;background-color:#0ff';
  particlesDiv.appendChild( particlesGraph );

  while ( particlesGraph.children.length < 174 ) {

    var bar = document.createElement( 'span' );
    bar.style.cssText = 'width:1px;height:78px;float:left;background-color:#113';
    particlesGraph.appendChild( bar );

  }
  */
  particlesDiv.style.display = 'block';

  var updateGraph = function ( dom, value ) {

    var child = dom.appendChild( dom.firstChild );
    child.style.height = value + 'px';

  };

  return {

    REVISION: 12,

    domElement: container,

    begin: function () {

    },

    end: function () {

      particlesText.textContent = particles + ' SPRITES (' + particlesMax + ')';
      //updateGraph( particlesGraph, Math.min( 78, 78 - (particles / (particlesMax + 50) ) * 78 ) );

    },

    update: function (numParticles) {

      particles = numParticles;
      this.end();

    }

  }

};

if ( typeof module === 'object' ) {

  module.exports = ParticlesStats;

}
