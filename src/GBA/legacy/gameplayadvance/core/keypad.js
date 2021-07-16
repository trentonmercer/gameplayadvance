function GameBoyAdvanceKeypad() {
	this.KEYCODE_LEFT = 37;
	this.KEYCODE_UP = 38;
	this.KEYCODE_RIGHT = 39;
	this.KEYCODE_DOWN = 40;
	this.KEYCODE_START = 13;
	this.KEYCODE_SELECT = 220;
	this.KEYCODE_A = 90;
	this.KEYCODE_B = 88;
	this.KEYCODE_L = 65;
	this.KEYCODE_R = 83;

	this.GAMEPAD_LEFT = 14;
	this.GAMEPAD_UP = 12;
	this.GAMEPAD_RIGHT = 15;
	this.GAMEPAD_DOWN = 13;
	this.GAMEPAD_START = 9;
	this.GAMEPAD_SELECT = 8;
	this.GAMEPAD_A = 1;
	this.GAMEPAD_B = 0;
	this.GAMEPAD_L = 4;
	this.GAMEPAD_R = 5;
	this.GAMEPAD_THRESHOLD = 0.2;

	this.A = 0;
	this.B = 1;
	this.SELECT = 2;
	this.START = 3;
	this.RIGHT = 4;
	this.LEFT = 5;
	this.UP = 6;
	this.DOWN = 7;
	this.R = 8;
	this.L = 9;

	this.currentDown = 0x03FF;
	this.eatInput = false;

	this.gamepads = [];
	this.buttons = [];
};
// Keyboard event handler
GameBoyAdvanceKeypad.prototype.keyboardHandler = function(e) {

	var toggle = 0;
	switch (e.keyCode) {
	case this.KEYCODE_START:
		toggle = this.START;
		break;
	case this.KEYCODE_SELECT:
		toggle = this.SELECT;
		break;
	case this.KEYCODE_A:
		toggle = this.A;
		break;
	case this.KEYCODE_B:
		toggle = this.B;
		break;
	case this.KEYCODE_L:
		toggle = this.L;
		break;
	case this.KEYCODE_R:
		toggle = this.R;
		break;
	case this.KEYCODE_UP:
		toggle = this.UP;
		break;
	case this.KEYCODE_RIGHT:
		toggle = this.RIGHT;
		break;
	case this.KEYCODE_DOWN:
		toggle = this.DOWN;
		break;
	case this.KEYCODE_LEFT:
		toggle = this.LEFT;
		break;
	default:
		return;
	}
	var test;

	
	toggle = 1 << toggle;
	if (e.type == "keydown") {
		console.log(test &= ~toggle);
		this.currentDown &= ~toggle;
	} else {
	//	console.log(test |= toggle);
		this.currentDown |= toggle;
	}

	//console.log(this.currentDown);

	if (this.eatInput) {
		e.preventDefault();
	}
};
// physical gamepad support
GameBoyAdvanceKeypad.prototype.gamepadHandler = function(gamepad) {
	var value = 0;
	if (gamepad.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.LEFT;
	}
	if (gamepad.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.UP;
	}
	if (gamepad.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.RIGHT;
	}
	if (gamepad.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.DOWN;
	}
	if (gamepad.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.START;
	}
	if (gamepad.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.SELECT;
	}
	if (gamepad.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.A;
	}
	if (gamepad.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.B;
	}
	if (gamepad.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.L;
	}
	if (gamepad.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD) {
		value |= 1 << this.R;
	}

	this.currentDown = ~value & 0x3FF;
};

// touch tap events
GameBoyAdvanceKeypad.prototype.touchHandler = function(e) {
	var toggle = 0;

	toggle = parseInt( e.target.id.split("_")[1] );

	toggle = 1 << toggle; // convert button_id to 1, 2, 4, 8, 16, 32, 64, 128, 256, 512

	var test;
	console.log(toggle);
	
	if (e.type == "touchstart" || e.type == "mousedown" || e.type == "touchmove") {
		this.currentDown &= ~toggle;
		console.log(test &= ~toggle);
	} else {
		console.log(test |= toggle);
		this.currentDown |= toggle;
	}
	
	if (this.eatInput) {
		e.preventDefault();
	}
};

// gamepads api for physical gamepads
GameBoyAdvanceKeypad.prototype.gamepadConnectHandler = function(gamepad) {
	this.gamepads.push(gamepad);
};

GameBoyAdvanceKeypad.prototype.gamepadDisconnectHandler = function(gamepad) {
	this.gamepads = self.gamepads.filter(function(other) { return other != gamepad });
};

// gamepads API for physical gamepads (poll if connected )
GameBoyAdvanceKeypad.prototype.pollGamepads = function() {
	var navigatorList = [];
	if (navigator.webkitGetGamepads) {
		navigatorList = navigator.webkitGetGamepads();
	} else if (navigator.getGamepads) {
		navigatorList = navigator.getGamepads();
	}

	// Let's all give a shout out to Chrome for making us get the gamepads EVERY FRAME
	if (navigatorList.length) {
		this.gamepads = [];
	}
	for (var i = 0; i < navigatorList.length; ++i) {
		if (navigatorList[i]) {
			this.gamepads.push(navigatorList[i]);
		}
	}
	if (this.gamepads.length > 0) {
		this.gamepadHandler(this.gamepads[0]);
	}
};

GameBoyAdvanceKeypad.prototype.handler = function(event) {

		event = event || window.event;
		event.target = event.target || event.srcElement;
	
		var element = event.target;
	
		// Climb up the document tree from the target of the event
		while (element) {
				// The user clicked on a <button> or clicked on an element inside a <button>
				// with a class name called "foo"
				this.touchHandler(event);
				break;
	
			element = element.parentNode;
		}
}


// Event listeners for input 
GameBoyAdvanceKeypad.prototype.registerHandlers = function() {

	// listen for keydown / keyup
	window.addEventListener("keydown", this.keyboardHandler.bind(this), true);
	window.addEventListener("keyup", this.keyboardHandler.bind(this), true);

	// Support for physical gamepads
	window.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), true);
	window.addEventListener("mozgamepadconnected", this.gamepadConnectHandler.bind(this), true);
	window.addEventListener("webkitgamepadconnected", this.gamepadConnectHandler.bind(this), true);

	window.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
	window.addEventListener("mozgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
	window.addEventListener("webkitgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);



	// All buttons added to the buttons list here will have the event listener added.
	this.buttons.push(
		this.A,
		this.B,
		this.LEFT,
		this.RIGHT,
		this.UP,
		this.DOWN,
	    this.SELECT,
		this.START,
	    this.L,
		this.R,
		
	)




	for (var i=0; i < this.buttons.length; i++) {
		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("touchstart", this.handler.bind(this), true);
		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("touchend", this.handler.bind(this), true);

		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("mousedown", this.handler.bind(this), true);
		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("mouseup", this.handler.bind(this), true);

	



		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("touchcancel", this.handler.bind(this), true);
		document.getElementById("button_" + String( this.buttons[i] ) ).addEventListener("mouseleave", this.handler.bind(this), true);
	}
};