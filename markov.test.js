"use strict";

const { MarkovMachine } = require("./markov");

/**Tests that MarkovMachine Works  */

describe("test MarkovMachine", function () {
	let testMachine;
	let branchyMachine;

	beforeEach(function () {
		testMachine = new MarkovMachine("The cat in the hat.");
		branchyMachine = new MarkovMachine("the cat the hat the fat");
	});

	test("getChains returns expected chain obj", function () {
		let chain = testMachine.getChains();
		expect(chain).toEqual({
			The: ["cat"],
			cat: ["in"],
			in: ["the"],
			the: ["hat."],
			"hat.": [null],
		});
	});

	test("getChains returns expected chain obj", function () {
		let chain = branchyMachine.getChains();
		expect(chain).toEqual({
			the: ["cat", "hat", "fat"],
			cat: ["the"],
			hat: ["the"],
			fat: [null],
		});
	});

	/** Tests getText by feeding it text with only one branch. Expected output always the same*/

	test("getText works for text without branches", function () {
		let text = testMachine.getText();
		expect(text).toEqual("The cat in the hat.");
	});

	/** Tests getText by checking that each word in the output is contained in the chain.*/

	test("getText works with branches", function () {
		let chain = branchyMachine.getChains();
		let text = branchyMachine.getText();
		let words = text.split(" ");
		expect(words[0]).toEqual("the");
		for (let i = 1; i < words.length; i++) {
			expect(chain[words[i - 1]]).toContain(words[i]);
		}
	});
});
