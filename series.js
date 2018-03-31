module.exports = series = (...args) => {
	if(!args.length) {
		throw new Error('Arguments is not defined');
	}

	const fn = args.shift();

	if(typeof fn != 'function') {
		throw new Error(`${fn} is not a function`);
	}

	const callback = (...argError) => {
		if(args.length) {
			if(argError.length) {
				series(args.pop())
			} else {
				series(...args);
			}
		}
	};

	fn(callback);
};