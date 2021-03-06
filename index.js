
function assert(string1, string2){
	if (string1 != string2){
		throw string1 + " does not equal " + string2;
	}
}
function arrayOperation(array1, array2, operator){
	assert(typeof(operator), "string");
	if (array1.length == array2.length){
		arrayToReturn = [];

		switch (operator){
			case "add":
				for (var i = 0; i < array1.length; i++){
					arrayToReturn.push(array1[i] + array2[i]);
				}
				return arrayToReturn;
				break;

			case "subtract":
				for (var i = 0; i < array1.length; i++){
					arrayToReturn.push(array1[i] - array2[i]);
				}
				return arrayToReturn;
				break;

			default:
				throw "ArrayOperation - operator not found";
		}
	}
	else{
		throw "ArrayOperation - Arrays not of same size, arrays must be the same size";
	}
}

// CLASS for mouse events
function MouseEventHandler(){
	var self = this;
	this.currentPos = null;
	this.prevPos = null;
	this.deltaPos = null;

	this.handleMoveEvent = function(event) {
		if (self.currentPos == null){
			self.currentPos = [event.pageX, event.pageY];
			return;
		}
		else{
			self.prevPos = self.currentPos;
			self.currentPos = [event.pageX, event.pageY];
			self.deltaPos = arrayOperation(self.currentPos, self.prevPos, "subtract");
			self.deltaPos = [self.currentPos[0] - self.prevPos[0], 
				self.currentPos[1] - self.prevPos[1]];
			if (self.deltaPos[0] > 30 || self.deltaPos[1] > 30){
				self.deltaPos = null;
			}
		}
	}
}

// CLASS for ball groups
function BallGroup(divId, columnsOfBalls){
	// Constructor call at bottom

	// this is a workaround so we can access
	// class variables in class functions
	var self = this;

    this.constructor = function(divId, columnsOfBalls){
		assert(typeof(divId), "string");
		self.divId = divId;
		assert(typeof(columnsOfBalls), "number"); 
		self.columnsOfBalls = columnsOfBalls-1; // So we can call generateNextLevel

		self.mouseEventHandler = new MouseEventHandler();

		self.baseBallHtmlId = "ball";
		// We need both initialPositions and positions so that
		// we can compare computed position to initialPosition
		// and set the top and left css position elements
		self.globalPosToLocalPos = [$(divId).offset().left, $(divId).offset().top];
		// this array takes a ball position and converts it to the center coordinates
		// We save self value so that we never have to run 
		// Math.sqrt when computing distances
		// This array is used to determine the drag of each ball
		self.ballDragFactors = [];

		self.addHoverEventListener();
		
		self.generateNextLevel();
    }

	this.generateNextLevel = function(){
		$(self.divId).empty();
		// See comments in the constructor for defenitions of class variables
        // columnsOfBalls is the only thing that changes per level.  Everything else
        // is built off of the value of columnsOfBalls
		self.columnsOfBalls++;
        self.setClassVariablesFromColumnsOfBalls();

		self.ballsOffScreen = 0;
		self.ballDragFactors = [];

        // create a random array of drag factors for the new level
		for (var i = 0; i < self.numberOfBalls; i++){
			self.ballDragFactors.push(1 + Math.random()*3);
		}
		self.fillHtmlContainerWithBalls(self.divId);
	}

    this.setClassVariablesFromColumnsOfBalls = function(){
        self.columnAndRowSize = $(divId).width()/self.columnsOfBalls;
		self.rowsOfBalls = Math.floor($(divId).height()/self.columnAndRowSize);
        self.numberOfBalls = self.columnsOfBalls * self.rowsOfBalls;
		self.positions = self.generatePostionArray();
		self.initialPositions = self.generatePostionArray();
		self.ballRadius = self.columnAndRowSize/2;
		self.topLeftCoordinatesToCenterCoordinates = [self.ballRadius, self.ballRadius];
		self.squaredRadius = self.ballRadius*self.ballRadius;
    }

	this.fillHtmlContainerWithBalls = function(container){
		assert(typeof(container), "string");
		$(container).empty();
		for (var i = 0; i < self.numberOfBalls; i++) {
			$(container).append("<div class='circle' id='" + 
				self.baseBallHtmlId + i + "' style='background-color:rgba(" + 
				Math.round(250*Math.random()) + "," + 
				Math.round(250*Math.random()) + "," + 
				Math.round(100*Math.random()) + ", 1);" +
				"width:" + self.columnAndRowSize + 
				"px;height:" + self.columnAndRowSize + 
				"px;'></div>");
		}
	}
    
    this.addHoverEventListener = function(){
		$(self.divId).mousemove(function(event){
			self.handleMouseMoveEvent(event);
		});

		$(self.divId).mouseleave(function(event){
		  	self.mouseEventHandler.currentPos = null;
		  	self.mouseEventHandler.prevPos = null;
		});
	}
	
    this.handleMouseMoveEvent = function(event){
		self.mouseEventHandler.handleMoveEvent(event);
		if (self.mouseEventHandler.deltaPos != null){
			self.moveBalls();
		}
	}

	this.moveBalls = function(){
		for (var i = 0; i < self.numberOfBalls; i++){
			if (self.positions[i])
				self.moveBall(i);
		}
	}

	this.moveBall = function(i){
		var center = arrayOperation(self.positions[i], 
			self.topLeftCoordinatesToCenterCoordinates, "add");
		if (self.isMouseOverBall(center)){

			self.updatePosition(i);
		 	
		 	if (self.isBallOffScreen(center)){

		 		self.removeBallFromList(i);

		 		if (self.ballsOffScreen >= self.numberOfBalls){
		 			self.generateNextLevel();
		 		}
		 	}
		 	else{
		     	self.updateCssPosition(i);
		 	}
		}
	}

	this.isMouseOverBall = function(center){

		var localMousePos = arrayOperation(self.mouseEventHandler.currentPos, 
			self.globalPosToLocalPos, "subtract");

		var distance = arrayOperation(center, localMousePos, "subtract");

		var squaredDistance = distance[0]*distance[0] + distance[1]*distance[1];

		if (squaredDistance < self.squaredRadius){
			return true;
		}
		return false;
	}

	this.isBallOffScreen = function(center){
		if (center[0] > $(self.divId).width() || center[0] < 0 
			|| center[1] > $(self.divId).height() || center[1] < 0){
			return true;
		}
		return false;
	}

	this.updatePosition = function(i){
		self.positions[i] = [
	 		self.positions[i][0]+self.mouseEventHandler.deltaPos[0]/self.ballDragFactors[i],
	 		self.positions[i][1]+self.mouseEventHandler.deltaPos[1]/self.ballDragFactors[i]
	 	];
	}

	this.updateCssPosition = function(i){
		$("#"+self.baseBallHtmlId+i).css({
    		top:  Math.round(self.positions[i][1]) - self.initialPositions[i][1],
    		left: Math.round(self.positions[i][0]) - self.initialPositions[i][0]
    	});
	}

	this.removeBallFromList = function(i){
		$("#"+self.baseBallHtmlId+i).css({opacity:0,});
 		self.positions[i] = false;
 		self.ballsOffScreen++;
	}

	this.generatePostionArray = function(){
		var positions = [];
		
		for (var row = 0; row < self.rowsOfBalls; row++){
		  	for (var column = 0; column < self.columnsOfBalls; column++){
		    	positions.push([column*self.columnAndRowSize, row*self.columnAndRowSize]);
		  	}
		}
		return positions;
	}

	// Create an object
	this.constructor(divId, columnsOfBalls);
}
