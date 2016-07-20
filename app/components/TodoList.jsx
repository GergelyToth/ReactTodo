var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
	render: function() {
		var {todos} = this.props;
		var renderTodos = () => (
			todos.map((todo) =>
				<Todo key={todo.id} {...todo}/>
			)
		);

		return (
			<div>
				{renderTodos()}
			</div>
		);
	}
});

module.exports = TodoList;