function sargs(args){
	if (!(this instanceof sargs)) {
		return new sargs(args)
	}
	let self = this
	var lets = this.lets = {}
	lets.counts = {}
	lets.types = {}

	self.args = function args(){
		var args = Array.prototype.slice.call(arguments)
		var lets = self.lets
		var who = self.isWho
		var array = []
		for (var index = 0; index < args.length; index++) {
			var type = who(args[index])
			array.push(type.toLowerCase())
		}
		var result
		var handler = lets.types[array.join(' ')] || lets.counts['' + args.length] || lets.handler
		if (typeof handler === 'function') {
			result = handler.apply(lets.self || this, args)
		}
		if (lets.result) {
			result = lets.result
		}
		return result
	}

	self.arguments = function(){
		return this.args.apply(this, arguments[0])
	}
}

module.exports = sargs

sargs.prototype.self = function(object){
	if (object) {
		this.lets.self = object
	}
	return this
}

sargs.prototype.result = function(result){
	if (result) {
		this.lets.result = result
	}
	return this
}

sargs.prototype.who = function(handler){
	if (typeof handler === 'function') {
		this.isWho = handler
	}
	return this
}

sargs.prototype.isWho = function(arg){
	var type = typeof arg
	if (type === 'object') {
		if (Array.isArray(arg)) {
			type = 'array'
		} else if (arg === null) {
			type = 'null'
		} else if (arg instanceof Date) {
			type = 'Date'
		} else if (arg instanceof RegExp) {
			type = 'RegExp'
		} else if (arg instanceof Error) {
			type = 'Error'
		}
	} else if (type === 'number') {
		if (isNaN(arg)) {
			type = 'NaN'
		}
	}
	return type
}

sargs.prototype.handler = function(handler){
	if (typeof handler === 'function') {
		this.lets.handler = handler
	}
	return this
}

sargs.prototype.counts = function(count, handler){
	if (typeof handler === 'function') {
		if (typeof count === 'number') {
			this.lets.counts['' + count] = handler
		}
	}
	return this
}

sargs.prototype.types = function(types, handler){
	if (typeof handler === 'function') {
		if (typeof types === 'string') {
			this.lets.types[types.trim().toLowerCase()] = handler
		}
	}
	return this
}