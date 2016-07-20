var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var expect = require('expect');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
	it('should exist', () => {
		expect(AddTodo).toExist();
	});

	it('should call onSetTodo if text entered', () => {
		var todoText = 'test todo';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onSetTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(todoText);
	});

	it('should not call onSetTodo if no text entered', () => {
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo onSetTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = '';
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	})
});