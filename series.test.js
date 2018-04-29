const series = require('./series');

describe('series', () => {
	test('Вызов series без аргументов', () => {
		expect(() => series()).toThrow('Arguments is not defined');
	});

	test('Вызов series с аргументом, который не явялется функцией', () => {
		expect(() => series(1)).toThrow(/\*? is not a function/);
	});

	test('Стандартный вызов series', (done) => {
		const calls = [];

		series(
			(callback) => {
				setTimeout(() => {
					calls.push(1);
					callback();
				}, 2000);
			},
			(callback) => {
				setTimeout(() => {
					calls.push(1);
					callback('error');
				}, 1000);
			},
			(callback) => {
				calls.push(1);
				callback();
			},
			(callback) => {
				callback();
				expect(calls.length).toBe(2);
				done();
			}
		);
	});

	test('Вызов series с одним аргументом', () => {
		series(
			(callback) => {
				expect(typeof callback).toBe('function');
			}
		);
	});
});