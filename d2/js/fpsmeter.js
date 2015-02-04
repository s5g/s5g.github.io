/**
 * @author Antony Liot
 */

var FPSMeter = function () {

  var startTime = Date.now(), prevTime = startTime;
  var fps = 0, fpsMedian = 0, fpsCounter = 0, fpsMin = Infinity, fpsMax = 0;
  var frames = 0;

  return {

    begin: function () {

      startTime = Date.now();

    },

    fps: function () {
      return fps;
    },

    fpsMin: function () {
      return fpsMin;
    },

    fpsMax: function () {
      return fpsMax;
    },

    fpsAvg: function () {
      return (fpsMedian / fpsCounter).toFixed(1);
    },

    end: function () {

      var time = Date.now();

      frames ++;

      if ( time > prevTime + 1000 ) {
        fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
        fpsMin = Math.min( fpsMin, fps );
        fpsMax = Math.max( fpsMax, fps );
        fpsMedian += fps;
        fpsCounter ++;

        prevTime = time;
        frames = 0;

      }

      return time;

    },

    update: function () {

      startTime = this.end();

    }

  }

};

if ( typeof module === 'object' ) {

  module.exports = FPSMeter;

}
