'use strict';

angular.module('directives').directive('pieChart', function ($compile) {
  return {
    restrict: "E",
    scope: {
      data: '='
    },
    link: function (scope, element, attrs) {

      function toolTipPlacement (start, end) {
        var angleAverage = (start + end) / 2 * 180 / Math.PI;
        var placement;
        switch(true)
        {
          case angleAverage >= 45 && angleAverage < 135:
            placement = "right";
            break;
          case angleAverage >= 135 && angleAverage < 225:
            placement = "bottom";
            break;
          case angleAverage >= 225 && angleAverage < 315:
            placement = "left";
            break;
          default:
            placement = "top";
            break;
        }
        return placement;
      };

      scope.$watch('data', function (newValue, oldValue, scope) {
        var arcOver = d3.svg.arc()
        .outerRadius((min/2 * 0.9) + 10);
        // guard clause if there is no value yet
        if (!newValue) {return};
        var el = element[0];
        var color = d3.scale.category10();
        var width = el.clientWidth;
        var height = 440;
        var min = Math.min(width, height); // get the smallest value to appropriately size the donut chart
        var pie = d3.layout.pie().sort(null).value(function (data) { return (data.open + data.paid_out) });
        var arc = d3.svg.arc()
          .outerRadius(min/2 * 0.9) // make the radius fit in the smallest dimension
          .innerRadius(min/2 * 0.3)
        var svg = d3.select(element[0])
          .append("svg").attr({width: min, height: min})
        var g = svg.append('g')

          g.selectAll('path').data(pie(newValue))
            .enter().append('path')
            // .on('click', function (d, i) {
            //   console.log("fuck you");
            //   this.setAttribute('popover', 'hi there');
            //   $compile(el)(scope);
            // })
            .on("mouseover", function(d) {
                console.log("well fuck");
                d3.select(this).select("path").transition()
                   .duration(300)
                   .attr("d", arcOver);
            })
            .on("mouseout", function(d) {
                d3.select(this).select("path").transition()
                   .duration(300)
                   .attr("d", arc);
            })
            .style('stroke', 'white')
            .attr('d', arc)
            .attr('tooltip-html-unsafe', function (d, i) {
              var logo = '<img class="img-rounded" style="max-height: 30px; max-width: 30px; margin-right: 5px; display: inline-block" src="'+d.data.image_url+'"></img>'
              var nameWithValue = d.data.name + "<strong>"+ " - $" + (d.data.open + d.data.paid_out)+"</strong>";
              var divs = logo+'<p style="display: inline-block;">'+nameWithValue+'</p>'
              return divs;
            })
            .attr("tooltip-trigger", 'mouseenter')
            .attr("tooltip-placement", function (d, i) {
              return toolTipPlacement(d.startAngle, d.endAngle);
            })
            .attr("tooltip-append-to-body", true)
            .attr('body', true)
            .attr('fill', function(d, i){ return color(i) });

        $compile(el)(scope);

        scope.$watch(function () {return el.clientWidth * el.clientHeight}, function (newValue, oldValue, scope) {
          width = el.clientWidth;
          height = el.clientWidth;
          min = Math.min(width, height);
          svg.attr({width: min, height: min})
          arc.outerRadius(min/2 * 0.9).innerRadius(min/2 * 0.3);
          svg.selectAll('path').attr('d', arc);
          g.attr('transform', 'translate('+min/2+','+min/2+")")
        });
      });
    }
  };
});
