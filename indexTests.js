QUnit.test("arrayOperation", function(assert){
	assert.deepEqual([1,2,3], arrayOperation([2, 5, 2], [-1, -3, 1], 'add'));
	assert.deepEqual([1, 2, 3], arrayOperation([2, 5, 2], [1, 3, -1], 'subtract'));
});
QUnit.test("MouseEventHandler", function(assert){
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

//QUnit.test("", function(assert){});