/*create by : winckell benjamin*/

/*exemples de fonctions appelez aux events*/
function usedOnMouseDown()
{
	console.log("mousedow");
}
function usedOnMouseUp()
{
	console.log("mouseUp");
}
function usedOnMouseMove(e)
{
	console.log("mouseMove");
}


/* array of keys who are catched by events*/
var keyBind ={
				0 : {
						mousedown : usedOnMouseDown,
						mouseup : usedOnMouseUp,
						mousemove : usedOnMouseMove
					},
				87: {keydown: function(){console.log("Down");}, keyup: function(){console.log("Up");},keypress: function(){console.log("press");}}
			};
/*
*class of input event gestion.
*this lib can be use for manage simples inputs with multi events
*Need to be instanciate in object in init of your game.

*HOW TO BIND A EVENT TO A INPUT:
*	Add in your array keyBind like That :  var keyBind = { KeyNumberOfInput :  { eventToCall : functionToActive() } }
	

*HOW TO INSTANTIATE EasyInput : 
	
	* var whatYouWant = new EasyInput(first) Argument : --> first : object of keyBinding,with event and functions call.

	

*Methodes of EasyInput : 
* 	addEvent(first,second) 2 params necessary	 --> first : string of the event who will be add (keydown,keyup,mousemove etc...); 
								 				 --> second : dom object like window or a document.getElementBy of what you want;
	use : for add event listenner on object;
*	removeEvent(first,second) 2 params necessary --> first : string of the event who will be remove (keydown,keyup,mousemove etc...);
								 	 			 --> second : dom object who had event listenner;
	use : for remove event listenner of an object;
*	setKeyBind(first,second) 2 params necessary	 --> first : integer of the key you want to bind with event(s). 									 
											 	 --> second : object of event(s) you want to use and function call by this event: {keypress : function(){}, keydown : functionWhoDoSomething };
	use : for add or edit one key with event(s);	

*	getKeysBind() 
	use : return you object who contain all keys binding and all events call for those keys.
*/
var EasyInput = function(object)
{
	var key = object;
	Input.prototype.addEvent = function(input , target)
	{	
		target.addEventListener(input, this.functionCall,false);
	}
	Input.prototype.functionCall = function(e)
	{
		if(key.hasOwnProperty(e.keyCode) && typeof key[e.keyCode][e.type] === "function")
			key[e.keyCode][e.type](e);
		else
			console.log("key["+e.keyCode+"] est undefined ou key["+e.keyCode+"]["+e.type+"] n'est pas une fonction");	
	}
	Input.prototype.removeEvent = function(input , target)
	{
		target.removeEventListener(input,this.functionCall,false);
	}
	Input.prototype.setKeyBind = function(keyInt , object)
	{
			if(typeof keyInt === 'number' && key.hasOwnProperty(keyInt) === false)
				key[keyInt] = object;
			else if(key.hasOwnProperty(keyInt) && typeof keyInt === 'number')
				for (var index in object)
					key[keyInt][index] = object[index]; 
			else if (typeof keyInt !== 'number')
				console.log(keyInt+" isn't a number");
	}
	Input.prototype.getKeysBind = function()
	{
		return key;
	}
}