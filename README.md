#EasyInput#

##Description :##
javascript lib for simply manage yours events on all keys / window gamepad / touch inputs you want.

##WebBrowser compatibility :##
Every both key and touch Events are working on Firefox , chrome , chromium.

*Warning : gamepad event is actually working **only** on **Chrome** and **chromium**.* 

##How to :##
- 1 : Insert EasyInput.js into your html.
    
        <html>
        <head>
            <title></title>
        </head>
        <body>
        
            <script src="path/to/your/lib/EasyInput.js"></script> 
        </body>
        </html>

- 2 : Create a new instance of EasyInput class inside your javascript.
        
        `var inputManager = new EasyInput()`


- 3 : Add a event listenner to your DOM with this following method.
        
        // list of all events possibility
        
        inputManager.addEvent("keydown", window);
        inputManager.addEvent("keyup", window);
        inputManager.addEvent("keypress", window);
        
        inputManager.addEvent("touchend", window);
        inputManager.addEvent("touchstart", window);
        inputManager.addEvent("touchmove", window);
        
        inputManager.addEvent("gamepad", window); //refer to warning content

- 4 : Add callback functions for every inputs keys you want.
       
        // for every callback, setKeyBind second argument is always *OBJECT*
        // like this : key_name = event_name 
        //             value = callback function
        
        inputManager.setKeyBind(0,{"touchend":function (){Game.eventController.emit("go-forward");}, "touchstart":myfunctionCallback});
        
        // for gamepad callBack IT'S ONLY A FUNCTION NOT OBJECT
        inputManager.setKeyBind("gamepad",function (e){console.log(e)});

##Gamepad callback description##

When you use **EasyInput.js** with gamepad Inputs, we pass as argument to your callback function **ONLY** active gamepad object( if many gamepads display inputs in same time, callback function will be call just as many as active gamepad ). 

gamepad argument structure display to your callback :
        
    {
      "buttons": {
        "a": 0,
        "b": 0,
        "x": 0,
        "y": 0,
        "lb": 0,
        "rb": 0,
        "lt": 0,
        "rt": 0,
        "select": 0,
        "start": 0,
        "leftStickPress": 0,
        "rightStickPress": 0,
        "directionnal-pad-top": 0,
        "directionnal-pad-bottom": 0,
        "directionnal-pad-left": 0,
        "directionnal-pad-right": 0,
        "extra-button": 0
      },
      "axes": {
        "stick-left-x": 0,
        "stick-left-y": 0,
        "stick-right-x": 0,
        "stick-right-y": 0
      },
      "id": 0
    }        

You can contact me at winckell.benjamin.isart@gmail.com
