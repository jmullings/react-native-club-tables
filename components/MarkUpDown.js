import React from 'react'

export default class MarkdownTextarea extends React.Component {
    constructor(props) {
        super(props);
        // this.props = {
        //     title: props.title,
        //     id: props.id,
        //     name: props.name,
        //     ref: props.ref,
        //     render: props.render,
        //     placeholder: props.placeholder,
        //     value: props.value,
        //     maxLength: props.maxLength
        // }
        this.state = {
            editing: false
        };
    }

    getInitialState() {
        return {editing: false}
    }


    render() {

        var style = {
            content: {
                cursor: 'url(img/pen.png), pointer'
            },
            editable: {
                // font:
            },
        }

        // var editor = <textarea defaultValue='Editor' />

        var editor = <div editable={true} style={style.editable}>
            <code>
                Content
            </code>
        </div>


        var content = <div style={style.content}>Content</div>


        return (
            <div onClick={this.handleToggle.bind(this)}>
                <div> {this.state.editing ? editor : content}</div>
            </div>
        )
    }

    handleToggle() {
        this.setState({editing: !this.state.editing})
    }
}