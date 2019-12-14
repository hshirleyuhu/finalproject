// import * as d3 from 'd3'

// const margin = {
//   top: 30,
//   right: 20,
//   bottom: 30,
//   left: 20
// }

// const width = 700 - margin.left - margin.right
// const height = 400 - margin.top - margin.bottom

// const svg = d3
//   .select('#bar-chart')
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)
//   .append('g')
//   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// const xPositionScale = d3.scaleBand().range([0, width])

// const yPositionScale = d3
//   .scaleLinear()
//   .domain([0, 85])
//   .range([height, 0])

// const colorScale = d3
//   .scaleOrdinal()
//   .range([
//     '#8dd3c7',
//     '#ffffb3',
//     '#bebada',
//     '#fb8072',
//     '#80b1d3',
//     '#fdb462',
//     '#b3de69'
//   ])

// d3.csv(require('../data/2018green.csv')).then(ready)

// function ready(datapoints) {
//   // Sort the countries from low to high
//   datapoints = datapoints.sort((a, b) => {
//     return a.fare_per_person - b.fare_per_person
//   })

//   // And set up the domain of the xPositionScale
//   // using the read-in data
//   const trip_distance = datapoints.map(d => d.trip_distance)
//   xPositionScale.domain(trip_distance)

//   /* Add your rectangles here */

//   d3.select('#<10').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.<10').attr('fill', '#4cc1fc')
//   })

//   d3.select('#10-20').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.10-20').attr('fill', '#4cc1fc')
//   })

//   d3.select('#20-30').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.namerica').attr('fill', '#4cc1fc')
//   })

//   d3.select('#30-40').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.30-40').attr('fill', 'pink')
//   })

//   d3.select('#40-50').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.40-50').attr('fill', 'green')
//   })

//   d3.select('#50-100').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.50-100').attr('fill', 'brown')
//   })

//   d3.select('#100+').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//     svg.selectAll('.100+').attr('fill', 'purple')
//   })
//   d3.select('#reset-btn').on('click', () => {
//     svg.selectAll('rect').attr('fill', 'lightgrey')
//   })

//   svg
//     .selectAll('rect')
//     .data(datapoints)
//     .enter()
//     .append('rect')
//     .attr('width', xPositionScale.bandwidth())
//     .attr('height', d => {
//       return height - yPositionScale(d.fare_per_person)
//     })
//     .attr('x', d => {
//       return xPositionScale(d.prange)
//     })
//     .attr('y', d => {
//       return yPositionScale(d.fare_per_person)
//     })
//     .attr('fill', 'lightgrey')
//     .attr('class', d => {
//       return d.prange.toLowerCase().replace(/[^a-z]*/g, '')
//     })

//   const yAxis = d3
//     .axisLeft(yPositionScale)
//     .tickSize(-width)
//     .ticks(5)

//   svg
//     .append('g')
//     .attr('class', 'axis y-axis')
//     .call(yAxis)
//     .lower()

//   d3.select('.y-axis .domain').remove()
// }
