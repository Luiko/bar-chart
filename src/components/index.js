import React, { Component } from 'react';
import dataset from "../dataset";
import * as d3 from 'd3';



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const marginY = 20;
    const marginLeft = 40;
    const yScale = d3.scaleLinear().domain([0, 18000]).range([
      0,
      400 - marginY*2])
    ;
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, 18000]).range([
      400 - marginY,
      marginY]))
    ;
    const fromDate = new Date(dataset['from_date']);
    const toDate = new Date(dataset['to_date']);
    const barWidth = Math.floor(900 / dataset.data.length);
    const xScale = d3.scaleTime().domain([fromDate, toDate]).range([
      marginLeft,
      barWidth * dataset.data.length])
    ;
    const xAxis = d3.axisBottom(xScale);
    d3.select('svg')
      .append('g')
      .attr('transform', () => `translate(0,${380})`)
      .call(xAxis)
    ;
    d3.select('svg')
      .append('g')
      .attr('transform', () => `translate(${marginLeft},0)`)
      .call(yAxis)
    ;
    console.log(yScale);
    d3.select('svg')
      .selectAll('rect')
      .data(dataset.data)
      .enter()
      .append('rect')
        .style('fill', 'blue')
        .attr('width', barWidth)
        .attr('height', d => yScale(d[1]))
        .attr('x', (d, i) => i * barWidth + marginLeft)
        .attr('y', d => (400 - marginY) - yScale(d[1]))
    ;
  }

  render() {
    return (
      <svg height='400px' width='900px'></svg>
    );
  }
}
