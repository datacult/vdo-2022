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
    const margin = //isMobile ? {
    //     left: 75,
    //     right: 50,
    //     top: 50,
    //     bottom: 50
    // } : 
    {
        left: 100,
        right: 100,
        top: 100,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    // const svgWidth = isMobile ? screen.width*1.5 : 920
    // const svgHeight = isMobile ? screen.height*1.2 : 650
    const svgWidth = 920
    const svgHeight = 650

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    d3.select(`${selector} svg`).remove();

    d3.select(selector)
    .style('display','flex')
    .style('flex-direction','column')
    .style('align-items','center')
    .style('justify-content','center')

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
        .translate([370, 240]);

        // variables
        var ak_trans = 'translate(0 0)', ak_scl = 1, hi_trans = 'translate(0 -20)', hi_scl = 1;

        } else {
         
        // Map and projection
        var scl = 0.182, mult = 2.3
        var projection = d3.geoAlbersUsa()
        .scale(width / scl / Math.PI)
        .translate([355, 240]);

        // variables
        var ak_trans = 'translate(0 0)', ak_scl = 1, hi_trans = 'translate(0 -20)', hi_scl = 1;
        }

    // Load external data and boot
d3.json("https://raw.githubusercontent.com/loganpowell/census-geojson/master/GeoJSON/500k/2021/state.json").then( function(geodata) {


// Draw the map
svg.append("g").attr('id','states_map')
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

document.getElementById('map-group').insertBefore(document.getElementById('states_map'), document.getElementById('campus-line0'));

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
        .attr('x',width*0.66)
        .attr('y',-20)

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
        .attr('x',10)
        .attr('y',height*0.5)

    d3.selectAll('.campus-image').attr('opacity',0)

    var defs = svg.append('defs')

    var inf_lines = [{"x":1,"y":3},
                     {"x":2,"y":2},
                     {"x":3,"y":1},
                     {"x":4,"y":2},
                     {"x":5,"y":3},
                     {"x":1,"y":5},
                     {"x":2,"y":6},
                     {"x":3,"y":7},
                     {"x":4,"y":6},
                     {"x":5,"y":5}],
        inf_images = [{"x":0.3,"y":1,"file":'gif'},
                     {"x":1.4,"y":0,"file":'svg'},
                     {"x":2.6,"y":-1.5,"file":'svg'},
                     {"x":3.75,"y":-0.5,"file":'svg'},
                     {"x":4.8,"y":0.8,"file":'gif'},
                     {"x":0.5,"y":4.5,"file":'svg'},
                     {"x":1.5,"y":6,"file":'svg'},
                     {"x":2.6,"y":6.8,"file":'gif'},
                     {"x":3.85,"y":5.5,"file":'svg'},
                     {"x":4.75,"y":4,"file":'svg'}]
    var inf_height = 150, inf_width = 80, rect_padding = 3

    var inf_groups = svg.append('g').attr('id','inf_groups')

    for (let i = 0; i < 10; i++) {

        // var inf_group = inf_groups.append('g')
        //             .attr('id','inf_group'+i)
        //             .attr('class','inf_group')

        var mask =  defs
				.append("clipPath")
				.attr("id", "logo-clip-" +i)
				.attr('class', 'logo-clip')

			mask
				.append("rect")
				.attr('class','logo-clip-rect')
				.attr('width', inf_width)
				.attr('height', inf_height)
				.attr('rx', 10);

        inf_groups.append("rect")
            .attr('id','inf-rect'+i)
            .attr('class',"inf-group")
            .attr('width', inf_width+2*rect_padding)
            .attr('height', inf_height+2*rect_padding)
            .attr('x',width*(inf_images[i].x)/6-rect_padding)
            .attr('y',height*(inf_images[i].y)/8-rect_padding)
            .attr('rx', 12)
            .attr('fill','none')
            .attr('stroke','#8979CC')
            .attr('stroke-width','2.5px');

        inf_groups.append("line")
            .attr('id',"inf-line"+i)
            .attr('class',"inf-line")
            .attr('stroke','#6941bd')
            .attr('x1',width/2)
            .attr('y1',height/2)
            .attr('x2',width/2)
            .attr('y2',height/2)

        inf_groups.append("image")
            .attr('id',"inf-image"+i)
            .attr('class',"inf-group")
            .attr('href',`https://datacult.github.io/vdo-2022/assets/youth/Micro-influencer-${i}.${inf_images[i].file}`)
            .attr('transform',`translate (${width*(inf_images[i].x)/6}, ${height*(inf_images[i].y)/8})`)
            .attr('height',150)
            .attr("clip-path", `url(#logo-clip-${i})`)
    }

    d3.selectAll('.inf-group').attr('opacity',0)

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
                    .duration(2500)
                    .attr('x2',width/4)
                    .attr('y2',height/4)

                d3.select('#campus-line1')
                    .transition()
                    .duration(2500)
                    .attr('x2',width*3/4)
                    .attr('y2',height/4)
                
                d3.select('#campus-line2')
                    .transition()
                    .duration(2500)
                    .attr('x2',width/4)
                    .attr('y2',height*3/4)

                d3.select('#campus-line3')
                    .transition()
                    .duration(2500)
                    .attr('x2',width*3/4-50)
                    .attr('y2',height*3/4)

                d3.selectAll('.inf-group')
                    .transition()
                    .duration(500)
                    .attr('opacity',0)

                d3.selectAll('.inf-line')
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

                d3.selectAll('.inf-group')
                    .transition()
                    .duration(1500)
                    .attr('opacity',1)

                inf_lines.forEach((line,i) => {
                    d3.select('#inf-line'+i)
                    .transition()
                    .duration(2500)
                    .attr('x2',width*(line.x)/6)
                    .attr('y2',height*(line.y)/8)
                });
                

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

                d3.selectAll('.inf-group')
                    .transition()
                    .duration(500)
                    .attr('opacity',0)

                d3.selectAll('.inf-line')
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

