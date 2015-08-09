QUnit.test("arrayOperation", function(assert){
	assert.deepEqual([1,2,3], arrayOperation([2, 5, 2], [-1, -3, 1], 'add'));
	assert.deepEqual([1, 2, 3], arrayOperation([2, 5, 2], [1, 3, -1], 'subtract'));
});
QUnit.test("MouseEventHandler", function(assert){
	
});