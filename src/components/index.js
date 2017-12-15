import React, { Component } from 'react';
import dataset from "../dataset";
import * as d3 from 'd3';



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const yScale = d3.scaleLinear().domain([0, 18000]).range([0, 400]);
    const yAxis = d3.axisLeft(yScale);
    const fromDate = new Date(dataset['form_date']);
    const toDate = new Date(dataset['to_date']);
    const width = Math.ceil(800 / dataset.data.length);
    const xScale = d3.scaleLinear().domain([fromDate, toDate]).range(0, width * dataset.data.length);
    const xAxis = d3.axisBottom(xScale);
    d3.select('svg')
      .append('g').call(yAxis)
      .selectAll('rect')
      .data(dataset.data)
      .enter()
      .append('rect')
        .style('fill', 'blue')
        .attr('width', width)
        .attr('height', d => yScale(d[1]))
        .attr('x', (d, i) => i * width)
        .attr('y', d => 400 - yScale(d[1]))
    ;
  }

  render() {
    return (
      <svg height='400px' width='800px'></svg>
    );
  }
}
