// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/01-bar-chart.js":[function(require,module,exports) {
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
},{}]},{},["scripts/01-bar-chart.js"], null)
//# sourceMappingURL=/01-bar-chart.cbe6f7af.js.map