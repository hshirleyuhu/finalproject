import * as d3 from 'd3'

const margin = { top: 40, left: 50, right: 50, bottom: 40 }

const height = 300 - margin.top - margin.bottom

const width = 600 - margin.left - margin.right

const svg = d3
  .select('#line-chart')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleLinear()
  .domain([0, 24])
  .range([0, width])
const yPositionScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([height, 0])

const line = d3
  .line()
  .x(function(d) {
    return xPositionScale(d.Hour)
  })
  .y(function(d) {
    return yPositionScale(d.percentage)
  })
  .curve(d3.curveMonotoneX)

d3.csv(require('../data/hourcount.csv'))
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  datapoints.sort(function(a, b) {
    return a.Hour - b.Hour
  })
  svg
    .append('path')
    .datum(datapoints)
    .attr('d', line)
    .attr('stroke', '#A9A9A9')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('cx', d => {
      return xPositionScale(d.Hour)
    })
    .attr('cy', d => {
      return yPositionScale(d.percentage)
    })
    .attr('r', 3)
    .attr('fill', '#A9A9A9')
    .on('mouseover', function(d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', 7)
      console.log(d)
      d3.select('#aapl-date').text(d.Hour)
      d3.select('#aapl-close').text(d.percentage)
      d3.select('#aapl-info').style('display', 'block')
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', 3)
    })

  svg
    .append('text')
    .text('Busiest Hour of A Day')
    .attr('x', 95)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('font-size', 22)
    .attr('font-weight', 'bold')

  const xAxis = d3
    .axisBottom(xPositionScale)
    .tickValues([0, 4, 8, 12, 16, 20, 24])
    // .tickFormat(d3.timeFormat('%b %Y'))
    .ticks(5)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3
    .axisLeft(yPositionScale)
    .tickValues([2, 4, 8, 10])
    .tickSize(-width)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  svg.selectAll('.y-axis path').remove()
  svg
    .selectAll('.y-axis line')
    .attr('stroke-dasharray', 2)
    .attr('stroke', 'grey')
}
