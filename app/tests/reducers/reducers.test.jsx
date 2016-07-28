var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict'); // checks if object get modified, if it does, throws an error

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('should set searchText', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'dog'
			};
			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		});
	});

	describe('showCompletedReducer', () => {
		it('should flip the showCompleted status', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};
			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	});

	describe('todosReducer', () => {
		it('should add new todo', () => {
			var action = {
				type: 'ADD_TODO',
				text: 'Walk the dog'
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0].text).toEqual(action.text);
		});

		it('should toggle todo to true and set completedAt', () => {
			var todos = [{
				id: 1,
				text: 'Walk the dog',
				completed: false,
				createdAt: 1234,
				completedAt: undefined
			}];
			var action = {
				type: 'TOGGLE_TODO',
				id: 1
			};
			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toBe(true);
			expect(res[0].completedAt).toBeA('number');
		});

		it('should toggle todo to false and remove completedAt', () => {
			var todos = [{
				id: 1,
				text: 'Walk the dog',
				completed: true,
				createdAt: 1234,
				completedAt: 12345
			}];
			var action = {
				type: 'TOGGLE_TODO',
				id: 1
			};
			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toBe(false);
			expect(res[0].completedAt).toBe(undefined);
		});

		it('should add existing todos', () => {
			var todos = [{
				id: 111,
				text: 'anything',
				completed: false,
				completedAt: undefined,
				createdAt: 33000
			}];
			var action = {
				type: 'ADD_TODOS',
				todos
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});
	});
});