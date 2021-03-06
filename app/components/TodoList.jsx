var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo';
var TodoAPI = require('API/TodoAPI');

export var TodoList = React.createClass({
	render: function() {
		var {todos, showCompleted, searchText} = this.props;
		var renderTodos = () => {
			var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

			if (!filterTodos.length) {
				return <p className="container__message">Nothing To Do</p>;
			}

			return filterTodos.map((todo) =>
				<Todo key={todo.id} {...todo}/>
			);
		};

		return (
			<div>
				{renderTodos()}
			</div>
		);
	}
});

export default connect(
	(state) => {
		return state;
	}
)(TodoList);