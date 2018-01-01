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
      400 - (marginY * 2)])
    ;
    const yAxis = d3.axisLeft(d3.scaleLinear().domain([0, 18000]).range([
      400 - marginY,
      marginY]))
    ;
    const fromDate = new Date(dataset['from_date']);
    const toDate = new Date(dataset['to_date']);
    const barWidth = Math.floor((800 + (marginLeft * 2)) / dataset.data.length);
    const xScale = d3.scaleTime().domain([fromDate, toDate]).range([
      marginLeft,
      marginLeft + (barWidth * dataset.data.length)])
    ;
    const xAxis = d3.axisBottom(xScale);
    const tooltip = d3.select('#tooltip');
    tooltip
      .style('background-color', 'white')
      .style('position', 'fixed')
      .style('display', 'none')
      .style('width', ' 160px')
      .style('border', '2px solid black')
      .style('border-radius', '5px')
    ;
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
        .on('mouseover', function (d) {
          const rect = d3.select(this);
          rect.style('fill', "#FFFF99");
          const { x , y } = d3.event;
          const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
          ];
          const quantity = `$${d[1]} billion`;
          const date = new Date(d[0]);
          const data = [quantity, `${date.getFullYear()}, ${months[date.getMonth()]}`];
          tooltip
            .selectAll('span')
            .style('display', 'block')
            .text((_, i) => data[i])
          ;
          tooltip
            .style('display', 'block')
            .style('top', (y - (marginY * 3)) + 'px')
            .style('left', x + 'px')
          ;
        })
        .on('mouseleave', function () {
          const rect = d3.select(this);
          rect.style('fill', 'blue');
          tooltip
            .style('display', 'none')
          ;
        })
    ;
  }

  render() {
    return (
      <svg height='400px' width='880px'></svg>
    );
  }
}
