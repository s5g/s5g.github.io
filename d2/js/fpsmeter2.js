//
// Copyright (C) 2013 Samsung Electronics Corporation. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided the following conditions are met:
//
// 1.  Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
// 2.  Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY SAMSUNG ELECTRONICS CORPORATION AND ITS
// CONTRIBUTORS "AS IS", AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING
// BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SAMSUNG
// ELECTRONICS CORPORATION OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES(INCLUDING
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS, OR BUSINESS INTERRUPTION), HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING
// NEGLIGENCE OR OTHERWISE ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function() {
    function setupAnimationFrame()
    {
        if (!window.requestAnimationFrame) {
            if (!window.webkitRequestAnimationFrame) {
                window.requestAnimationFrame = function(callback, element) {
                    return window.setTimeout(callback, 1000 / 60);
                }
            }
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        }

        if (!window.cancelAnimationFrame) {
            if (!window.webkitCancelAnimationFrame) {
                window.cancelAnimationFrame = function(id) {
                    window.clearTimeout(id);
                }
            }
            window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        }
    }

    // FPS Statistics
    var frameCount = 0;
    var totalFrames = 0;
    var minFPS = 1000;
    var maxFPS = 0;
    var secondsSinceBegin = 0;

    // Animation frame request / update timer handlers
    var requestId;
    var updateTimer;

    // FPS div element
    var fpsElem;

    // Animation frame counter, CPU usage around ~1%
    function animationFrame() {
        frameCount++;
        requestId = window.requestAnimationFrame(animationFrame);
    }

    function injectFPSCounter() {
        fpsElem = document.createElement('div');
        fpsElem.style.position = "fixed";
        fpsElem.style.top = "0px";
        fpsElem.style.left = "0px";
        fpsElem.style.zIndex = "9999";
        fpsElem.style.fontFamily = "'Lucida Grande', Verdana, Arial";
        fpsElem.style.fontSize = "64px";
        fpsElem.style.fontWeight = "bold";
        fpsElem.style.background = "yellow";
        fpsElem.style.color = "black";

        /*
        var bgColor = window.getComputedStyle(document.body).backgroundColor;
        // Simple check on body's background color
        if (bgColor == "black" || bgColor == "rgb(0, 0, 0)" || bgColor == "#000000") {
            fpsElem.style.color = "white";
        }
        */

        document.body.appendChild(fpsElem);
    }

    function showFPS() {
        // Statistics
        minFPS = Math.min(minFPS, frameCount);
        maxFPS = Math.max(maxFPS, frameCount);
        totalFrames += frameCount;

        fpsElem.innerHTML = frameCount;

        frameCount = 0;

        // Stops after 30s
        if (++secondsSinceBegin == 30) {
            cancelAnimationFrame(requestId);
            clearInterval(updateTimer);
            fpsElem.innerHTML = "avg: " + Math.round(totalFrames/30) + " min: " + minFPS + " max: " + maxFPS;
        }
    }

    function initFramework() {
        // We're supposed to have 'window' element
        window.removeEventListener('load', initFramework, false);
        setupAnimationFrame();
        injectFPSCounter();

        // Updates FPS every second
        requestId = window.requestAnimationFrame(animationFrame);
        updateTimer = setInterval(function(){showFPS()}, 1000);
    }

    window.addEventListener('load', initFramework, false);
}());
