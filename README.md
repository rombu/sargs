# sargs
pattern strategy

### the description
	implementation of pattern strategy

### tasks of library
	simplify writing terms
	readable code

### install
	npm install sargs

### methods
	self - takes any type data which will be transfered to handler as this
		* if not set this data then into main handler will be transfered this of processing
	result - takes any type data which will be returned after final processing
		* if not set this data then after final processing will be returned his result
	handler - takes function which will be call if do not find any handler in filter
	who - handler which return type of argument
		* you can change this handler because its own handler has several check options

	* types have level up priotity at counts
	types - filter by types arguments
	counts - filter by count arguments

	args - intended for use outside main handler
	arguments - intended for use inside main handler

### use

	var sargs = require('sargs')

	function SameClass(){

		this.method1 = sargs()
				.counts(2, function(){})
				.counts(3, function(){})
				.counts(4, function(){})
				.types('string number object function', function(string, number, object, function){})
				.types('object function', function(object, function){})
				.types('object', function(object){})
				.args

		this.method2 = function(){
			return sargs()
				.self(this)
				.result(this)
				.counts(2, function(){})
				.counts(3, function(){})
				.counts(4, function(){})
				.types('string number object function', function(string, number, object, function){})
				.types('object function', function(object, function){})
				.types('object', function(object){})
				.arguments(arguments)
		}

	}