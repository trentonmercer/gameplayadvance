var gba;
var runCommands = [];
var userInfo = JSON.parse( localStorage.getItem("userInfo"));





if (debug == false) {
     // Check if running in PWA mode
     if (navigator.standalone == true || matchMedia('(display-mode: standalone)').matches == true) { // first is safari, second is chrome
    	//$("#screen-splash").hide();
    	//settingsToggle();
    } else {
        $("#button-library").hide(); 
        document.write('<div id="screen-splash" class="screen-splash"></div><div id="screen-instructions" class="screen-instructions"><div class="placeholder"><div class="appicon"></div><h1>Game Play Advanced</h1><ol class="install-instructions"><li>Open in Mobile Safari on your iPhone or iPad</li><li>Tap the "Share" button</li><li>Choose "Add to Home Screen"</li></ol></div></div>');
  }
}

// Get stored user color
try {
    var favoriteColor = userInfo.favoriteColor;
} catch {
    var favoriteColor = 'purple';
}

// Set user color
$("#gameboy").addClass(favoriteColor); 

// listen for color changes in settings
$(".colorblock").on("click", function() {

    //favoriteColor // remove favrite color
    $("#gameboy").removeClass(favoriteColor); 

    userInfo = {favoriteColor: $(this).attr('id')};
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    favoriteColor = $(this).attr('id'); // set new favorite color
    $("#gameboy").addClass( $(this).attr('id')); // add fav color

});

function settingsToggle() {
	$('.modal').toggleClass("opened");
}

function openNav() {
    document.getElementById("librarynav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("librarynav").style.width = "0";
  } 



function setSound(audio_option) {
    
   // soundPrompt();
    $(".menu").css("width", "0");

    start(audio_option);
}

$(window).on("load", function() {
    $("#sound-enable").removeClass("hide-menu");
    $("#sound-cancel").removeClass("hide-menu");
})

$("#sound-enable").on("click", function() { setSound(true) });
$("#sound-cancel").on("click", function() { setSound(false) });

function start(audio_option) {

    try {
        gba = new GameBoyAdvance(audio_option);
        gba.keypad.eatInput = true;
        gba.setLogger(function(level, error) {
            console.log(error);
            gba.pause();
            var screen = document.getElementById('screen');
            if (screen.getAttribute('class') == 'dead') {
                console.log('We appear to have crashed multiple times without reseting.');
                return;
            }
            var crash = document.createElement('img');
            crash.setAttribute('id', 'crash');
            crash.setAttribute('src', 'resources/crash.png');
            screen.parentElement.insertBefore(crash, screen);
            screen.setAttribute('class', 'dead');
        });
    
    } catch (exception) {
        gba = null;
    }
    
    
    if (gba && FileReader) {
        var canvas = document.getElementById('screen');
        gba.setCanvas(canvas);

        gba.logLevel = gba.LOG_ERROR;

        loadRom('resources/bios.bin', function(bios) {
            gba.setBios(bios);
        });

        if (window.navigator.appName == 'Microsoft Internet Explorer') {
            // Remove the pixelated option if it doesn't work
            var pixelatedBox = document.getElementById('pixelated');
            pixelatedBox.parentElement.removeChild(pixelatedBox);
        }
    } 
}

function run(file) {
    var load = document.getElementById('select');
    load.textContent = 'ROM Loaded';
    load.removeAttribute('onclick');
    var pause = document.getElementById('pause');
    pause.textContent = "Pause";
    gba.loadRomFromFile(file, function(result) {
        closeNav();
        if (result) {
            for (var i = 0; i < runCommands.length; ++i) {
                runCommands[i]();
            }
            runCommands = [];
            gba.runStable();
        } else {
            openNav();
            load.textContent = 'FAILED';
            setTimeout(function() {
                load.textContent = 'Load a .gba ROM';
                load.onclick = function() {
                    document.getElementById('loader').click();
                }
            }, 3000);
        }
    });
}

function saveRom(e) {
    var file = e;
    var reader = new FileReader()
    var filename = file.name;

    reader.onload = function(base64) {
        localStorage["GPA_ROM_STORAGE_" + filename] = base64;
    }

    reader.readAsDataURL(file);
 }

 /*

 // Saved to localstorage
 function getRoms() {
    games = [];
    var keys = Object.keys(localStorage);
    for (i=0; i < keys.length; i++) {
        var key = keys[i];
        if (key.includes("GPA_ROM_STORAGE_")) {
            games.push(key)    
        }
    }

    alert(games);
 }

 */
/*
function getStoredRom(ROM) {

    var base64 = localStorage[ROM];
    var base64Parts = base64.split(",");
    var fileFormat = base64Parts[0].split(";")[1];
    var fileContent = base64Parts[1];
    var file = new File([fileContent], "file name here", {type: fileFormat});

    gba.setRom(file);
}

// alert( getStoredRom('GPA_ROM_STORAGE_Pokemon - Fire Red Version (U) (V1.1).gba') );
*/


function reset() {
    gba.pause();
    settingsToggle();
    gba.reset();
    var load = document.getElementById('select');
    load.textContent = 'Load a .gba ROM';
    var crash = document.getElementById('crash');
    if (crash) {
        var context = gba.targetCanvas.getContext('2d');
        context.clearRect(0, 0, 480, 320);
        gba.video.drawCallback();
        crash.parentElement.removeChild(crash);
        var canvas = document.getElementById('screen');
        canvas.removeAttribute('class');
    } else {
        lcdFade(gba.context, gba.targetCanvas.getContext('2d'), gba.video.drawCallback);
    }
    load.onclick = function() {
        document.getElementById('loader').click();
    }
    fadeOut('ingame', 'preload');

}

function uploadSavedataPending(file) {
    runCommands.push(function() { gba.loadSavedataFromFile(file) });
}

function togglePause() {
    var e = document.getElementById('pause');
    if (gba.paused) {
            gba.runStable();
        e.textContent = "Pause";
    } else {
            gba.pause();
        e.textContent = "Play";
    }
}

function screenshot() {
    var canvas = gba.indirectCanvas;
    window.open(canvas.toDataURL('image/png'), 'screenshot');
}

function lcdFade(context, target, callback) {
    var i = 0;
    var drawInterval = setInterval(function() {
        i++;
        var pixelData = context.getImageData(0, 0, 240, 160);
        for (var y = 0; y < 160; ++y) {
            for (var x = 0; x < 240; ++x) {
                var xDiff = Math.abs(x - 120);
                var yDiff = Math.abs(y - 80) * 0.8;
                var xFactor = (120 - i - xDiff) / 120;
                var yFactor = (80 - i - ((y & 1) * 10) - yDiff + Math.pow(xDiff, 1 / 2)) / 80;
                pixelData.data[(x + y * 240) * 4 + 3] *= Math.pow(xFactor, 1 / 3) * Math.pow(yFactor, 1 / 2);
            }
        }
        context.putImageData(pixelData, 0, 0);
        target.clearRect(0, 0, 480, 320);
        if (i > 40) {
            clearInterval(drawInterval);
        } else {
            callback();
        }
    }, 50);
}

function setVolume(value) {
    gba.audio.masterVolume = Math.pow(2, value) - 1;
}

function setPixelated(pixelated) {
    var screen = document.getElementById('screen');
    var context = screen.getContext('2d');
    if (context.webkitImageSmoothingEnabled) {
        context.webkitImageSmoothingEnabled = !pixelated;
    } else if (context.mozImageSmoothingEnabled) {
        context.mozImageSmoothingEnabled = !pixelated;
    } else if (window.navigator.appName != 'Microsoft Internet Explorer') {
            if (pixelated) {
                screen.setAttribute('width', '240');
                screen.setAttribute('height', '160');
            } else {
                screen.setAttribute('width', '480');
                screen.setAttribute('height', '320');
            }
            if (window.navigator.appName == 'Opera') {
            // Ugly hack! Ew!
            if (pixelated) {
                screen.style.marginTop = '0';
                screen.style.marginBottom = '-325px';
            } else {
                delete screen.style;
            }
        }
    }
}

function enableDebug() {
    window.onmessage = function(message) {
        if (message.origin != document.domain && (message.origin != 'file://' || document.domain)) {
            console.log('Failed XSS');
            return;
        }
        switch (message.data) {
        case 'connect':
            if (message.source == debug) {
                debug.postMessage('connect', document.domain || '*');
            }
            break;
        case 'connected':
            break;
        case 'disconnect':
            if (message.source == debug) {
                debug = null;
            }
        }
    }
    window.onunload = function() {
        if (debug && debug.postMessage) {
            debug.postMessage('disconnect', document.domain || '*');
        }
    }
    if (!debug || !debug.postMessage) {
        debug = window.open('debugger.html', 'debug');
    } else {
        debug.postMessage('connect', document.domain || '*');
    }
}

document.addEventListener('webkitfullscreenchange', function() {
    var canvas = document.getElementById('screen');
    if (document.webkitIsFullScreen) {
        canvas.setAttribute('height', document.body.offsetHeight);
        canvas.setAttribute('width', document.body.offsetHeight / 2 * 3);
        canvas.setAttribute('style', 'margin: 0');
    } else {
        canvas.setAttribute('height', 320);
        canvas.setAttribute('width', 480);
        canvas.removeAttribute('style');
    }
}, false);
