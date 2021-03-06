describe("Storage variables", function() {

	var Absurd = require("../index.js");

	it("should use variables", function(done) {
		var absurd = Absurd();
		var api = absurd.api;
		api
		.storage("brand-color", "#BADA55")
		.add({
			body: {
				color: absurd.api.storage("brand-color")
			}
		});
		absurd.compile(function(err, css) {
			expect(err).toBe(null);
			expect(css).toBeDefined();
			expect(css).toContain('color: #BADA55');
			done();
		});
	});

	it("should use variables stored in different files", function(done) {
		Absurd(__dirname + "/data/css/storage.js").compile(function(err, css) {
			expect(err).toBe(null);
			expect(css).toBeDefined();
			expect(css).toContain('color: #BADA55');
			done();
		});
	});

	it("should use function", function(done) {
		var absurd = Absurd();
		var api = absurd.api;
		api
		.storage("border", function(color) {
			return 'solid 1px ' + color;
		})
		.add({
			header: {
				border: api.storage("border")("#0099AA")
			}
		});
		absurd.compile(function(err, css) {
			expect(err).toBe(null);
			expect(css).toBeDefined();
			expect(css).toContain('border: solid 1px #0099AA');
			done();
		})
	});

});