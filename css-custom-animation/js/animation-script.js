/*
    animation-script.js
    CSS Custom Animation
    November 2013
    Vanessa Garcia

*/
//alert("init");

// Check for CSS  support
// read json and create animation based off of it 

var animType = '';


function checkAnimSupport(){
    if(('animation' in document.body.style) || ('-webkit-animation' in document.body.style) || ('-moz-animation' in document.body.style)) {
        animType = "CSS";
    }
    else{
      animType = "JS";
    }

    $('.type').text(animType);
}

function delegateAnim(obj){
    if(animType === "CSS"){
      cssAnim(obj);
    }
    else{
      jsAnim(obj);
    }
}


function cssAnim(obj){
    console.log('cssAnim');
    
    var animEl    = obj.element;
    //var animFill  = "forwards";
    var animFill  = obj.fill ? obj.fill : "forwards";
    var animDelay = obj.delay ? obj.delay : "0";
    var animProp  = obj.keyframe +" "+obj.duration+"ms "+ obj.easing +" "+ animDelay+"ms " + animFill;
      
    $(animEl).css("animation", animProp);
    $(animEl).css("-webkit-animation", animProp);
    //callback function/animation end listener
    if(obj.callback){
    $(animEl).one('animationend MSAnimationend webkitAnimationEnd', function(){
        obj.callback();
      });
    } 
}

//JS Fallback Animation
function jsAnim(obj){
    //console.log("run JS fallback");
    var animEl    = obj.element;
    var animDelay = obj.delay ? obj.delay : "0";
    var anim = {};

    for (var k in obj.fallbackProps){
      if (obj.fallbackProps.hasOwnProperty(k)) {
        anim[k] = obj.fallbackProps[k];    
      }
    }
    setTimeout(function(){
      if($(animEl).length > 1){
        $(animEl).each(function( index ){
          if(index < $(animEl).length-1){
            $(animEl).eq(index).animate(anim, obj.duration);
          }
          else{
            $(animEl).eq(index).animate(anim, obj.duration, obj.callback);
          }
        });
      }
      else{
        $(animEl).animate(anim, obj.duration, obj.callback);
      }
    }, animDelay);
}

function animateSequence(){
    console.log("animation sequence");
    // var self = this;

    var bringUpSun = function(){
      delegateAnim({
        element: ".sun",
        keyframe: "bringUpSun",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "top": 20
        }
      });

      delegateAnim({
        element: ".moon",
        keyframe: "bringDownMoon",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "top": 550
        }
      });

      delegateAnim({
        element: ".night-sky",
        keyframe: "hideElement",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "opacity": 0
        },
        callback: moveClouds
      });
    };

    var moveClouds = function(){
        delegateAnim({
        element: ".clouds",
        keyframe: "moveInClouds",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "left": 0
        },
        callback: showHelicopter
      });
    };

    var showHelicopter = function(){
        delegateAnim({
        element: ".plane",
        keyframe: "flyHelicopter",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "left": -220
        },
        callback: removeClouds
      });
    };

    var removeClouds = function(){
        delegateAnim({
        element: ".clouds",
        keyframe: "moveOutClouds",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "left": 500
        },
        callback: bringTheNight
      });
    };

    var bringTheNight = function(){
      delegateAnim({
        element: ".sun",
        keyframe: "bringDownMoon",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "top": 550
        }
      });

      delegateAnim({
        element: ".moon",
        keyframe: "bringUpSun",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "top": 20
        }
      });

      delegateAnim({
        element: ".night-sky",
        keyframe: "showElement",
        fill: "forwards",
        duration: 2000,
        delay: 0,
        easing: "ease-out",
        fallbackProps: {
          "opacity": 1
        }
      });
    };
   
    bringUpSun();

}

function createStars(){
    var starContainer = $('.night-sky');
    var numStars = 50;
    var createEm = '';

    for(var i=0; i<numStars; i++){
        var randomNum1 = Math.random();
        console.log("create star");
        createEm += "<span style='top:"+Math.random()*500+"; left:"+Math.random()*500+"; opacity:"+Math.random()+"'>&#9734;</span>"
    }

    starContainer.html(createEm);
}

function init(){
    checkAnimSupport();
    createStars();
    $('.start').one('click', animateSequence);
}


init();

