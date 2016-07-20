var React = require('react');

var AddTodo = React.createClass({
	onSubmit: function(e) {
		e.preventDefault();
		var todoText = this.refs.todoText.value;

		if (todoText.length) {
			this.refs.todoText.value = '';
			this.props.onSetTodo(todoText);
		} else {
			this.refs.todoText.focus();
		}
	},
	addTodo: function() {

	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="todoText" placeholder="What do you need to do?"/>
					<button>Add Todo</button>
				</form>
			</div>
		)
	}
});

module.exports = AddTodo;