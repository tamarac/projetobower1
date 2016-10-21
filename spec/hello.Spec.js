describe('0lá', function(){
	var hello;
	beforeEach(function() {
	 	hello = new Hello();
	});

	it('diga meu nome corretamente', function() {
		expect(hello.sayHi('Tamara')).toEqual('Meu nome é Tamara e eu estou aprendendo grunt');
	});
});
