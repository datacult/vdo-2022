// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let youth = ((selector = '#youth-programs') => {

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false

    ////////////////////////////////////
    //////////// svg setup /////////////
    ////////////////////////////////////

    var body = d3.select(selector)
    body.html("")

    // margins for SVG
    const margin = isMobile ? {
        left: 75,
        right: 50,
        top: 50,
        bottom: 50
    } : {
        left: 100,
        right: 100,
        top: 100,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 920
    const svgHeight = isMobile ? screen.height*1.2 : 650

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    d3.select(`${selector} svg`).remove();

    const svg = d3.select(selector)
        .append('svg')
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .append('g')
        .attr('id','map-group')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    /// scroll observer for initial load
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: [.5]
          };
    
            const campus = document.querySelector('#campus');
    
            const campusObserver = new IntersectionObserver(handleCampus, options);
        
            function handleCampus(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(1)
                }
            };
        
            campusObserver.observe(campus);

            const influencers = document.querySelector('#influencers');
    
            const influencersObserver = new IntersectionObserver(handleInfluencers, options);
        
            function handleInfluencers(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(2)
                }
            };
        
            influencersObserver.observe(influencers);

            const reach = document.querySelector('#reach');
    
            const reachObserver = new IntersectionObserver(handleReach, options);
        
            function handleReach(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(3)
                }
            };
        
            reachObserver.observe(reach);

    ////////////////////////////////////
    //////////// Scales ////////////
    //////////////////////////////////// 

    // Add radius axis scale
    const radScale = d3.scaleLinear()
        .domain([40, 50])
        .range([50, 100]);

    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 
    
    //Build the graph in here!

    if (window.outerWidth > 900){
    
        // Map and projection
        var scl = 0.2, mult = 2.3
        var projection = d3.geoAlbersUsa()
        .scale(width / scl / Math.PI)
        // .translate([width*mult+125, height*mult-160]);
        .translate([370, 240]);

        // variables
        var circ_rad = 5, ak_trans = 'translate(0 0)', ak_scl = 1, hi_trans = 'translate(0 -20)', hi_scl = 1, icon_size = 30;

        } else {
         
        // Map and projection
        var scl = 0.32, mult = 1.55
        var projection = d3.geoMercator()
        .scale(width / scl / Math.PI)
        .translate([width*mult+245, height*mult-200]);

        // variables
        var circ_rad = 2.5, ak_trans = 'translate(175 360)', ak_scl = 0.5, hi_trans = 'translate(670 -260)', hi_scl = 2, icon_size = 25;
    }

    // Load external data and boot
d3.json("https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/500k/2021/state.json").then( function(geodata) {


// Draw the map
svg.append("g").attr('id','states')
    .selectAll(".country")
    .data(geodata.features)
    .join("path")
        .attr('class','country')
        .attr('id',d => d.properties.NAME.replace(" ", "-"))
        .attr("fill", "#D6D6F2")
        .attr("d", d3.geoPath()
        .projection(projection)
        )
        .style("stroke", "#F7F8FF")
        .style('stroke-width',1)
        .style('opacity',1);

d3.select("#Alaska").attr('transform',ak_trans+" scale("+ak_scl+")")
d3.select("#Hawaii").attr('transform',hi_trans+" scale("+hi_scl+")")
d3.select("#Puerto-Rico").attr('display',"none")

document.getElementById('map-group').insertBefore(document.getElementById('states'), document.getElementById('campus-line0'));

})

    for (let i = 0; i < 4; i++) {
        svg.append("line")
            .attr('id',"campus-line"+i)
            .attr('class',"campus-line")
            .attr('stroke','#6941bd')
            .attr('x1',width/2)
            .attr('y1',height/2)
            .attr('x2',width/2)
            .attr('y2',height/2)
    }

    svg.append("image")
        .attr('id',"campus-image0")
        .attr('class',"campus-image")
        .attr('href','https://datacult.github.io/vdo-2022/assets/youth/campus1.svg')
        .attr('x',width/8)
        .attr('y',height/8-20)

    svg.append("image")
        .attr('id',"campus-image1")
        .attr('class',"campus-image")
        .attr('href','https://datacult.github.io/vdo-2022/assets/youth/campus4.svg')
        .attr('x',width*0.63)
        .attr('y',-10)

    svg.append("image")
        .attr('id',"campus-image3")
        .attr('class',"campus-image")
        .attr('href','https://datacult.github.io/vdo-2022/assets/youth/campus2.svg')
        .attr('x',width*0.6)
        .attr('y',height*0.65)

    svg.append("image")
        .attr('id',"campus-image2")
        .attr('class',"campus-image")
        .attr('href','https://datacult.github.io/vdo-2022/assets/youth/campus3.svg')
        .attr('x',0)
        .attr('y',height*0.4)

        d3.selectAll('.campus-image').attr('opacity',0)

    for (let i = 0; i < 9; i++) {
        svg.append("line")
            .attr('id',"inf-line"+i)
            .attr('class',"inf-line")
            .attr('stroke','#6941bd')
            .attr('x1',width/2)
            .attr('y1',height/2)
            .attr('x2',width/2)
            .attr('y2',height/2)
    }

    // add circle
    var data_circle = svg.append("circle")
        .attr('id',"data-circle")
        .attr('r',0)
        .attr('fill','#F7F8FF')
        .attr('cx',width/2)
        .attr('cy',height/2)
        .attr('stroke','white')
        .attr('stroke-width',0)

    var img_width = 100, img_ratio = 1.67
    var data_logo = svg.append("image")
        .attr('id',"data-logo")
        .attr('href','https://datacult.github.io/vdo-2022/assets/youth/vdo-logo.svg')
        .attr('x',(width-img_width)/2)
        .attr('y',(height-img_width/img_ratio)/2)
        .attr('height',img_width/img_ratio)
        .attr('width',img_width)
    
    var radius = 180
    // drawDonutChart(40)
    
    // function drawDonutChart(percent) {
    
      var dataset = {
            lower: calcPercent(0),
            upper: calcPercent(40.15)
          },
          pie = d3.pie().sort(null)
    
      var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
    
      var path = svg.selectAll("path")
            .data(pie(dataset.lower))
            .enter().append("path")
            .attr("class", function(d, i) { return "color" + i })
            .attr("d", arc)
            .attr('fill','#3f2687')
            .attr('opacity',0)
            .attr('transform',`translate(${width/2} ${height/2})`)
            .each(function(d) { this._current = d; }); // store the initial values

        d3.select('.color0').attr('opacity',1)
    
        var progress = 0;
        // var timeout = setTimeout(function () {
        //   clearTimeout(timeout);
        //   path = path.data(pie(dataset.upper)); // update the data
        //   path.transition().duration(1500).attrTween("d", function (a) {
        //     // Store the displayed angles in _current.
        //     // Then, interpolate from _current to the new angles.
        //     // During the transition, _current is updated in-place by d3.interpolate.
        //     var i  = d3.interpolate(this._current, a);
        //     var i2 = d3.interpolate(progress, percent)
        //     this._current = i(0);
        //     return function(t) {
        //       return arc(i(t));
        //     };
        //   }); // redraw the arcs
        // }, 200);
    //   };
    
    function calcPercent(percent) {
      return [percent, 100-percent];
    };


    // use this code to add annotations
    // svg.append("text")
    //     .attr("x", width/2)
    //     .attr("y", height/2)
    //     .text("Hi Angie, happy coding!")
    //     .style("font-size", "40px")
    //     .style('text-anchor','middle')


    
    //scroll update function 
    function update(step) {
        // update for step 1
            if (step == 1){

                data_circle
                    .attr('r',radScale(45))
                    .attr('stroke-width',0)

                data_logo
                    .style('opacity',1)

                d3.selectAll('.campus-image')
                    .transition()
                    .duration(1500)
                    .attr('opacity',1)

                d3.select('#campus-line0')
                    .transition()
                    .duration(1500)
                    .attr('x2',width/4)
                    .attr('y2',height/4)

                d3.select('#campus-line1')
                    .transition()
                    .duration(1500)
                    .attr('x2',width*3/4)
                    .attr('y2',height/4)
                
                d3.select('#campus-line2')
                    .transition()
                    .duration(1500)
                    .attr('x2',width/4)
                    .attr('y2',height*3/4)

                d3.select('#campus-line3')
                    .transition()
                    .duration(1500)
                    .attr('x2',width*3/4-50)
                    .attr('y2',height*3/4)

                d3.selectAll('.country')
                    .transition()
                    .duration(1500)
                    .style('opacity',1)

                path = path.data(pie(dataset.lower)); // update the data
                path.transition().duration(500).attrTween("d", function (a) {
                    var i  = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                    return arc(i(t));
                    };
                });

            }
        // update for step 2
            else if (step == 2){

                data_circle
                    .attr('r',radScale(50))
                    .attr('stroke-width',0)

                data_logo
                    .style('opacity',1)

                d3.selectAll('.campus-image')
                    .transition()
                    .duration(500)
                    .attr('opacity',0)

                d3.selectAll('.campus-line')
                    .transition()
                    .duration(500)
                    .attr('x2',width/2)
                    .attr('y2',height/2)

                d3.selectAll('.country')
                    .transition()
                    .duration(1500)
                    .style('opacity',1)

                    path = path.data(pie(dataset.lower)); // update the data
                    path.transition().duration(500).attrTween("d", function (a) {
                      var i  = d3.interpolate(this._current, a);
                      this._current = i(0);
                      return function(t) {
                        return arc(i(t));
                      };
                    });               

            }
        // update for step 2
            else if (step == 3){

                data_circle
                .attr('r',radius)
                .attr('stroke-width',3)

                data_logo
                    .style('opacity',0.1)

                d3.selectAll('.campus-image')
                    .transition()
                    .duration(500)
                    .attr('opacity',0)

                d3.selectAll('.campus-line')
                    .transition()
                    .duration(500)
                    .attr('x2',width/2)
                    .attr('y2',height/2)

                d3.selectAll('.country')
                    .transition()
                    .duration(1500)
                    .style('opacity',0.3)

                path = path.data(pie(dataset.upper)); // update the data
                path.transition().duration(1500).delay(1500).attrTween("d", function (a) {
                    var i  = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                    return arc(i(t));
                    };
                });

                
            }

               

    }

})

