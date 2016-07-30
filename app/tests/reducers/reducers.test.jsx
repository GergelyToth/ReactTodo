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
				todo: {
					id: 'abc123',
					text: 'Something to do',
					completed: false,
					createdAt: 987654
				}
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('should update todo to true and set completedAt', () => {
			var todos = [{
				id: 1,
				text: 'Walk the dog',
				completed: false,
				createdAt: 1234,
				completedAt: undefined
			}];
			var updates = {
				completed: true,
				completedAt: 123
			};
			var action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			};
			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toBe(true);
			expect(res[0].completedAt).toBeA('number');
			expect(res[0].text).toBe(todos[0].text);
		});

		it('should update todo to false and remove completedAt', () => {
			var todos = [{
				id: 1,
				text: 'Walk the dog',
				completed: true,
				createdAt: 1234,
				completedAt: 12345
			}];
			var updates = {
				completed: false,
				completedAt: null
			};
			var action = {
				type: 'UPDATE_TODO',
				id: todos[0].id,
				updates
			};
			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toBe(updates.completed);
			expect(res[0].completedAt).toBe(updates.completedAt);
			expect(res[0].text).toBe(todos[0].text);
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

		it('should wipe todos on LOGOUT', () => {
			var todos = [{
				id: 111,
				text: 'anything',
				completed: false,
				completedAt: undefined,
				createdAt: 33000
			}];
			var action = {
				type: 'LOGOUT'
			};
			var res = reducers.todosReducer(df(todos), df(action));

			expect(res.length).toEqual(0);
		});
	});

	describe('authReducer', () => {
		it('should add uid object', () => {
			var auth = {uid: 'abcd1234'};
			var action = {
				type: 'LOGIN',
				uid: auth.uid
			};
			var res = reducers.authReducer(df({}), df(action));

			expect(res).toEqual(auth);
			expect(res).toBeA('object');
		});

		it('should delete uid and return an empty object', () => {
			var action = {
				type: 'LOGOUT'
			};
			var res = reducers.authReducer(df({uid: 'abcd1234'}), df(action));

			expect(res).toEqual({});
			expect(res).toBeA('object');
		});
	});
});