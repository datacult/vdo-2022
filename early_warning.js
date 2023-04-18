// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let warning = ((selector = '#warning') => {

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
    const svgWidth = isMobile ? screen.width*1.5 : window.innerWidth
    const svgHeight = isMobile ? screen.height*1.2 : window.innerHeight

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    d3.select(`${selector} svg`).remove();

    const svg = d3.select(selector)
        .append('svg')
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    /// scroll observer for initial load
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: [.5]
          };
    
            const visits = document.querySelector('#visits');
    
            const visitsObserver = new IntersectionObserver(handleVisits, options);
        
            function handleVisits(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update()
                }
            };
        
            visitsObserver.observe(visits);

    ////////////////////////////////////
    //////////// Scales ////////////
    //////////////////////////////////// 

    //update your scales to match the data! for now base this on the first view

    // Add X axis scale
    const xScale = d3.scaleBand()
        .domain(['bar1','bar2'])
        .range([0,width]);


    // Add Y axis scale
    const yScale = d3.scaleLinear()
        .domain([0, 100000])
        .range([height, 0]);

    ////////////////////////////////////
    //////////// Axis ////////////
    //////////////////////////////////// 

    // we shouldn't need axes based on the design :)

    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 
    
    //Build the graph in here!

    const rectWidth = 50;
    const rectHeight1 = 100;
    const rectHeight2 = 200;
    const rectSpacing = 200;
    const rectColor = '#1C0D32';
    const rectX= 50;

    // use this code to draw the gradient between the bars
    var defs = svg.append('defs')

    //add gradient
    var grad = defs.append('linearGradient')
        .attr('id','poly-grad')
        .attr('x1',1)
        .attr('x2',0)
        .attr('y1',0)
        .attr('y2',0.25)

        grad.append('stop')
        .attr('offset','-11.19%')
        .attr('stop-color','#D6D6F2')

        grad.append('stop')
        .attr('offset','105%')
        .attr('stop-color','#F7F8FF')

    // the path structure is built off of four coordinates with Z closing the shape
    // learn the structure here https://css-tricks.com/svg-path-syntax-illustrated-guide/
        svg.append('path')
        .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${(height - rectHeight2)},L${rectX + rectWidth - 5},${height - rectHeight1 + 5},Z`)
        .attr('fill','url(#poly-grad)')

    //Create the first bar
    svg.append('rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight1)
        .attr('x', rectX)
        .attr('y', height - rectHeight1)
        .attr('fill', rectColor)
        .attr('rx', 10)
        .attr('ry', 10);
    
    //Add the value of the first bar
    svg.append('text')
        .text('141,448')
        .attr('x', rectX + rectWidth / 2)
        .attr('y', height - rectHeight1 + 20)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', 'white')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','400');
    
    //Add the first bar's x-axis labels
    svg.append('text')
        .text('Prior to the SCOTUS decision')
        .attr('x', rectX + rectWidth / 2)
        .attr('y', height + 20)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','700');
    
    svg.append('text')
        .text('June 10 – June 23')
        .attr('x', rectX + rectWidth / 2)
        .attr('y', height + 35)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','400');
    
    //Create the second bar
    svg.append('rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight2)
        .attr('x', rectX + rectWidth + rectSpacing)
        .attr('y', height - rectHeight2)
        .attr('fill', rectColor)
        .attr('rx', 10)
        .attr('ry', 10);

    //Add the value of the second bar
    svg.append('text')
        .text('644,154')
        .attr('x', rectX + rectWidth + rectSpacing + rectWidth / 2)
        .attr('y', height - rectHeight2 + 20)
        .style('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', 'white')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','400');
    
    //Add the second bar's x-axis labels
    svg.append('text')
        .text('After the SCOTUS decision')
        .attr('x', rectX + rectWidth + rectSpacing + rectWidth / 2)
        .attr('y', height + 20)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','700');
    
    svg.append('text')
        .text('June 24 – July 7')
        .attr('x', rectX + rectWidth + rectSpacing + rectWidth  / 2)
        .attr('y', height + 35)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('fill', 'black')
        .style('font-family','Barlow')
        .style('font-size','18px')
        .style('font-weight','400');

    // use this code to add annotations
    // svg.append("text")
    //     .attr("x", width/2)
    //     .attr("y", height/2)
    //     .text("Hi Angie, happy coding!")
    //     .style("font-size", "40px")
    //     .style('text-anchor','middle')
    
    //scroll update function 
    function update() {
        // this is where we'll add in the functions to change the graph states on scroll
        // DON'T WORRY ABOUT THIS FOR NOW!

        // update for step 1
            // update xScale

            // update data

            // update annotation

        // update for step 2
            // update xScale

            // update data

            // update annotation

        // update for step 2
            // update xScale

            // update data + add categories

            // update annotation

               

    }

})

