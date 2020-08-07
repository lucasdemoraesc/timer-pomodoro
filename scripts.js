const circleElement = document.querySelector('.circle');

function setCirclePercent(percent) {
	const circlePerimeter = 597;
	const dashOffset = (circlePerimeter * (percent/100));

	circleElement.style.setProperty('--dash-offset', circlePerimeter-dashOffset);
}