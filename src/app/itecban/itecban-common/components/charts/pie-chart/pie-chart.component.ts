import { Component, ViewEncapsulation, Input, AfterViewInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import * as D3 from 'd3';
import { CurrencyPipe } from 'onesait-core';

@Component({
  selector: 'app-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() data: any[];
  @Input() idSvg: string;
  @Input() colorArr: any[];
  @Input() worthless: string;

  // private svg;     // TODO replace all `any` by the right type
  private width: number;
  private margin;
  private height: number;
  private radius: number;
  private chart_r: number;
  private color: any;
  private arc: any;
  private pie: any;
  private container;
  public legends;
  count = 0;
  clientX: number;
  clientY: number;
  labelData: string;

  constructor(
    private currencyPipe: CurrencyPipe,
  ) { }

  ngAfterViewInit(): void {
    this.count = 0;
    this.setup();
  }

  private setup(): void {
    this.container = D3.select('#' + this.idSvg);
    this.margin = { top: 5, right: 5, bottom: 5, left: 5 };
    this.width = 700 - this.margin.left - this.margin.right;
    this.height = 300 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    this.arc = D3.arc().outerRadius(this.radius - 20).innerRadius(this.radius - 70);
    this.pie = D3.pie().sort(null).value((d: any) => d.count);
    this.color =  D3.scaleOrdinal().range(this.colorArr);
    this.chart_r = this.width / 14;
    this.createDonut();
  }

  private createDonut(): void {
    let chart_m = this.width / 85;
    this.container
      .append('svg')
      .attr('width', '150px')
      .attr('height', (this.chart_r + chart_m) * 2.1)
      .attr('id', 'svg' + this.idSvg)
      .append('g')
      .attr('class', (_d, i) => { return 'donut type' + i; })
      .attr('transform', 'translate(' + (10 + this.chart_r + chart_m) + ',' + (this.chart_r + chart_m) + ')');
    this.animateDonut();
  }

  private animateDonut(): void {

    let arca = D3.arc()
    .innerRadius(0)
    .outerRadius(57);

    if (!this.data[0] ) {
      this.colorArr.unshift('#828989');
      this.color =  D3.scaleOrdinal().range(this.colorArr);
      this.data.push({
        count: 0.00000001,
        label: this.labelData
      });
    }

    for (let y = 0; y < this.data.length; y++) {

      if ((this.data[0].count === 0) || (this.data[0].count === undefined)) {
        this.data[0].count = 0.00000001;
      }

      this.count = this.count + this.data[y].count;

      if (this.count === undefined || this.count === 0 || this.count === 0.00000001 ) {
        let cd = 0.00000001;
        let ld = this.data[0].label;
        this.data.splice( 0, this.data.length);
        this.colorArr.unshift('#828989');
        this.data.push({
          count: cd,
          label: ld
        });
      } else {
        if (this.colorArr.indexOf('#828989') > -1 ) {
          this.colorArr.find( (e) => {
            this.colorArr.splice(0, 1);
            return e === '#828989';
          });
        }
      }
    }

    this.arc = D3.arc()
      .innerRadius((this.chart_r * 0.7) + 4)
      .outerRadius((this.chart_r * 1.04) - 3);

    // Start joining data with paths
    let paths = this.container.select('.donut')
    .selectAll('path')
    .data(this.pie(this.data));
    paths
      .enter()
      .append('g')
      .append('path')
      .attr('fill', (_d, i) => {
        return this.color(i);
      })
      .transition()
      .delay((_d, i) => {
        return i * 90;
      })
      .attrTween('d', (d) => {
        let i = D3.interpolate(d.startAngle, d.endAngle);
        return (t) => {
          d.endAngle = i(t);
          return this.arc(d);
        };
      });

    paths
      .enter()
      .append('g')
      .append('path')
      .attr('fill', (_d, i) => {
        return this.color(i);
      })
      .attr('id', 'path' + this.idSvg)
      .on('mousemove', this.handleMouseMove)
      .on('mouseover', this.handleMouseOver)
      .on('mouseout', this.handleMouseOut)
      .style('opacity', 0.3)
      .style('cursor', 'pointer')
      .transition()
      .delay((_d, i) => {
        return i * 90;
      })
      .attrTween('d', (d) => {
        let i = D3.interpolate(d.startAngle, d.endAngle);
        return (t) => {
          d.endAngle = i(t);
          return arca(d);
        };
      });
  }

  handleMouseOver(event, _index, nodes) {
    let mainDiv = D3.select('#' + nodes[0].parentNode.parentNode.parentNode.parentNode.id )
      .append('div')
      .attr('class', 'tooltip right')
      .attr('id', 'tooltip-' + nodes[0].parentNode.parentNode.parentNode.parentNode.id)
      .attr('dx', '1em')
      .attr('dy', '.3em')
      .style('opacity', 1.0);

    mainDiv.append('div')
    .attr('class', 'tooltip-arrow');

    mainDiv.append('div')
      .attr('class', 'tooltip-inner')
      .append('text')
      .attr('id', 'tooltip')
      .style('font-size', '12px')
      .text(event.data.label);
  }

  handleMouseMove(_event, _index, nodes) {
    D3.select('#' + nodes[0].parentNode.parentNode.parentNode.parentNode.id )
      .select('div')
      .style('position', 'absolute')
      .style('top', (D3.event.layerY + 10) + 'px')
      .style('left', (D3.event.layerX + 20) + 'px');
  }

  handleMouseOut(_event, _index, nodes) {
    D3.select('#' + nodes[0].parentNode.parentNode.parentNode.parentNode.id).select('div').remove();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.data[0]) {
      this.labelData = this.currencyPipe.transform(0.00, this.worthless);
    }

    if (this.data[0]) {
      if (this.data[0].count === undefined || this.data[0].count === 0 || this.data[0].count === 0.00000001) {
        this.colorArr.unshift('#828989');
        this.color =  D3.scaleOrdinal().range(this.colorArr);
      } else {
        if (this.colorArr.indexOf('#828989') > -1 ) {
          this.colorArr.find( (e) => {
            this.colorArr.shift();
            this.colorArr.shift();
            return e === '#828989';
          });
        }
      }
    }

    if (changes.data) {
      D3.select('#' + this.idSvg).selectAll('svg').remove();
      this.setup();
    }
  }

  ngOnDestroy() {
    if (this.colorArr.indexOf('#828989') > -1 ) {
      this.colorArr.find( (e) => {
        this.colorArr.splice(0, 1);
        return e === '#828989';
      });
    }
  }

}
