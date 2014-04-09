// create by : winckell benjamin
/*
*class of input event gestion.
*this lib can be use for manage simples inputs with multi events
*Need to be instanciate in init of your game.

*HOW TO BIND A EVENT TO A INPUT:
*   Add in your array keyBind like That :  var keyBind = { KeyNumberOfInput :  { eventToCall : functionToActive() } }
    

*HOW TO INSTANTIATE EasyInput : 
    
    * var whatYouWant = new EasyInput(first) Argument : --> first : object of keyBinding,with event and functions call.

    

*Methodes of EasyInput : 
*   addEvent(first,second) 2 params necessary    --> first : string of the event who will be add (keydown,keyup,mousemove etc...); 
                                                 --> second : dom object like window or a document.getElementBy of what you want;
    use : for add event listenner on object;

*   removeEvent(first,second) 2 params necessary --> first : string of the event who will be remove (keydown,keyup,mousemove etc...);
                                                 --> second : dom object who had event listenner;
    use : for remove event listenner of an object;

*   setKeyBind(first,second) 2 params necessary  --> first : integer of the key you want to bind with event(s).                                      
                                                 --> second : object of event(s) you want to use and function call by this event: {keypress : function(){}, keydown : functionWhoDoSomething };
    use : for add or edit one key with event(s);    

*   getKeysBind() 
    use : return you object who contain all keys binding and all events call for those keys.

*/
'use strict';

var EasyInput = function()
{
    var key = {};
    var gamePadDictionnary = { 
            buttons:{0:"a",
                    1:"b",
                    2:"x",
                    3:"y",
                    4:"lb",
                    5:"rb",
                    6:"lt",
                    7:"rt",
                    8:"select",
                    9:"start",
                    10:"leftStickPress",
                    11:"rightStickPress",
                    12:"directionnal-pad-top",
                    13:"directionnal-pad-bottom",
                    14:"directionnal-pad-left",
                    15:"directionnal-pad-right",
                    16:"extra-button"
                },
            axes:{ 0: "stick-left-x",
                1: "stick-left-y",
                2: "stick-right-x",
                3: "stick-right-y"}
        }

    var DictonnaryKey =  {
        0: "\\",
        8: "backspace",
        9: "tab",
        12: "num",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "caps",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        44: "print",
        45: "insert",
        46: "delete",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        91: "cmd",
        92: "cmd",
        93: "cmd",
        96: "num_0",
        97: "num_1",
        98: "num_2",
        99: "num_3",
        100: "num_4",
        101: "num_5",
        102: "num_6",
        103: "num_7",
        104: "num_8",
        105: "num_9",
        106: "num_multiply",
        107: "num_add",
        108: "num_enter",
        109: "num_subtract",
        110: "num_decimal",
        111: "num_divide",
        124: "print",
        144: "num",
        145: "scroll",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "\'",
        223: "`",
        224: "cmd",
        225: "alt",
        57392: "ctrl",
        63289: "num"
    };
    EasyInput.prototype.addEvent = function(input , target)
    {   
        if(input === "gamepad" && !!navigator.webkitGetGamepads ){

            this.startGamePadLoop(target);
        }
        else 
            target.addEventListener(input, this.functionCall,false);
    };
    EasyInput.prototype.functionCall = function(e)
    {
        if(key.hasOwnProperty(e.keyCode) && typeof key[e.keyCode][e.type] === "function")
            key[e.keyCode][e.type](e);
    };
    EasyInput.prototype.removeEvent = function(input , target)
    {
        target.removeEventListener(input,this.functionCall,false);
    };
    EasyInput.prototype.setKeyBind = function(submittedKey , object)
    {
        if(key.hasOwnProperty(submittedKey) === false)
        {
            if(typeof submittedKey ==='string' && submittedKey!=="gamepad")
                var submittedKey = this.findInKey(submittedKey);
            else{
                key[submittedKey] = object;
                return;
            }

            key[submittedKey] = object;
        }
        else if(key.hasOwnProperty(submittedKey))
        {  
            if(typeof submittedKey ==='string' && submittedKey!=="gamepad")
                var submittedKey = this.findInKey(submittedKey);
            else{
                key[submittedKey] = object;
                return;
            }

            for (var index in object)
                key[submittedKey][index] = object[index]; 
        } 
    };
    EasyInput.prototype.getKeysBind = function()
    {
        return key;
    };
    EasyInput.prototype.findInKey = function(submittedKey){
        var index = -1;
        var i;
        for( i in DictonnaryKey) {
            if (DictonnaryKey[i] === submittedKey) {
                index = i;    
                break;
            }
        }
        return index;
    };
    EasyInput.prototype.startGamePadLoop = function()
    {
        var gamePadFrameBefore =[];
        var currentGamepad = [];
        var gamepads ;
        var self = this;
        
        function testGamepad (undefined){
            gamepads = navigator.webkitGetGamepads();

            for (var i=0;i<gamepads.length;i++){
                   if(gamepads[i]!==undefined )
                    {
                        // console.log("YO")
                        var myGamePad = {buttons:{},axes:{},id:i};
                        var o;

                        for(var o=0;o < gamepads[i].buttons.length;o++) {
                            myGamePad.buttons[gamePadDictionnary.buttons[o]] = gamepads[i].buttons[o];        
                        }
                        for(var b=0;b < gamepads[i].axes.length;b++) {
                            if(gamepads[i].axes[b]>0.3 || gamepads[i].axes[b]<-0.3)
                                myGamePad.axes[gamePadDictionnary.axes[b]] = gamepads[i].axes[b];
                            else 
                                myGamePad.axes[gamePadDictionnary.axes[b]] = 0;
                        }

                        gamePadFrameBefore[i] = currentGamepad[i];
                        key.gamepad(myGamePad);
                    }
            }


        }

        var gamepadLoop = setInterval(testGamepad,1000/60)

    };
    EasyInput.prototype.hashCode = function(string){
        
        var hash, i, chr, len;

        if (string.length == 0) return hash;
        
        for (i = 0, len = string.length; i < len; i++) {
            chr   = string.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

};
module.exports = EasyInput;
