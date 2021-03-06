import * as React from 'react'
const styles = require('./slide.css')

export interface SlideProps {
	state: 'past' | 'current' | 'future'
	children: any
	className: string
	center: boolean
	style: object
}

export class Slide extends React.Component<SlideProps, {}> {
	render () {
		return (
			<div
				role="Slide"
				className={[
					this.props.className,
					styles.slide,
					styles[this.props.state]
				].join(' ')}
			>
				<div className={[styles.body, this.props.className, this.props.center ? styles.vcenter : styles.vfill].join(' ')} style={{...this.props.style}}>{this.props.children}</div>
			</div>
		)
	}

	static defaultProps = {
		state: 'future',
		className: '',
		center: true
	}
}

export default Slide
