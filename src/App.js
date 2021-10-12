import React from "react";
import $ from 'jquery'


export default class App extends React.Component {

    componentDidMount() {
        $('<h1/>')
            .text('Hello from Jquery')
            .css({
                textAlign: 'center',
                color: 'blue'
            })
            .appendTo($('header'))
    }

    render() {
        return ( <
            React.Fragment >

            <
            header > < /header>

            <
            hr / >

            <
            div className = "box" >
            <
            h2 className = "box-title" > Box Title < /h2> <
            p className = "box-text" > Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde ad velit aperiam maxime ? Officiis mollitia vitae at veniam maxime provident non reiciendis, repellat distinctio facilis a ab voluptate labore quisquam. < /p> <
            /div> <
            /React.Fragment>
        )
    }
}