// @flow

import React from 'react'
import PropTypes from 'prop-types'
import styles from './canvas.css'
import Slide from './slide'

class Canvas extends React.Component {
	constructor (props) {
		super(props)
		this.state = {position: 0}
		this.slides = null
		this.handleNavigation = this.handleNavigation.bind(this)
	}

	getChildContext () {
		return {
			handleNavigation: this.handleNavigation,
			position: this.state.position
		}
	}

	handleNavigation (direction: number) {
		this.setState({position: this.state.position + direction})
	}

	render () {
		this.slides = []
		let getState = index =>
			this.state.position > index
				? 'past'
				: this.state.position < index ? 'future' : 'current'
		let addSlide = el => {
			if (el) this.slides.push(el)
		}

		let index = 0
		let render = React.Children.map(this.props.children, child => {
			switch (child.type) {
				case Slide:
					return React.cloneElement(child, {
						ref: addSlide,
						state: getState(index++)
					})
				default:
					return child
			}
		})

		return <div className={styles.stage}>{render}</div>
	}
}

Canvas.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element)
}

Canvas.childContextTypes = {
	handleNavigation: PropTypes.func,
	position: PropTypes.number
}

export default Canvas
