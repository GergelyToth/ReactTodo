var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo';

export var TodoList = React.createClass({
	render: function() {
		var {todos} = this.props;
		var renderTodos = () => {
			if (!todos.length) {
				return <p className="container__message">Nothing To Do</p>;
			}

			return todos.map((todo) =>
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
		return {
			todos: state.todos
		};
	}
)(TodoList);