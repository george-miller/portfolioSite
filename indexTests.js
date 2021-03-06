QUnit.test("arrayOperation", function(assert){
	assert.deepEqual([1,2,3], arrayOperation([2, 5, 2], [-1, -3, 1], 'add'));
	assert.deepEqual([1, 2, 3], arrayOperation([2, 5, 2], [1, 3, -1], 'subtract'));
});
QUnit.test("MouseEventHandler", function(assert){
    // Simulate moving the mouse and test the results
	var mouseEventHandler = new MouseEventHandler();
	mouseEventHandler.handleMoveEvent({
		pageX : 10,
		pageY : 20
	});
	assert.deepEqual(mouseEventHandler.currentPos, [10, 20]);
	assert.deepEqual(mouseEventHandler.prevPos, null);
	assert.deepEqual(mouseEventHandler.deltaPos, null);
	mouseEventHandler.handleMoveEvent({
		pageX : 30,
		pageY : 50
	});
	assert.deepEqual(mouseEventHandler.currentPos, [30, 50]);
	assert.deepEqual(mouseEventHandler.prevPos, [10,20]);
	assert.deepEqual(mouseEventHandler.deltaPos, [20, 30]);
	mouseEventHandler.handleMoveEvent({
		pageX : 1000,
		pageY : 500
	});
	assert.deepEqual(mouseEventHandler.currentPos, [1000, 500]);
	assert.deepEqual(mouseEventHandler.prevPos, [30,50]);
	assert.deepEqual(mouseEventHandler.deltaPos, null);
});

$(document).ready(function(){
	var ballGroup = new BallGroup("#test", 4);

	QUnit.module("BallGroup");
    QUnit.test("testFillHtmlContainerWithBalls", function(assert){
        ballGroup.fillHtmlContainerWithBalls(ballGroup.divId);

        ok($(ballGroup.divId).children().size() == ballGroup.numberOfBalls, 
                "actual number of balls equal to ballGroup.numberOfBalls");
    });

});
