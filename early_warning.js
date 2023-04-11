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




    // use this code to add annotations
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height/2)
        .text("Hi Angie, happy coding!")
        .style("font-size", "40px")
        .style('text-anchor','middle')


    // // use this code to draw the gradient between the bars
    // var defs = svg.append('defs')

    // //add gradient
    // var grad = defs.append('linearGradient')
    //     .attr('id','poly-grad')
    //     .attr('x1',0)
    //     .attr('x2',0)
    //     .attr('y1',0)
    //     .attr('y2',1)
        
    //     grad.append('stop')
    //     .attr('offset','0%')
    //     .attr('stop-color','#00000033')

    //     grad.append('stop')
    //     .attr('offset','100%')
    //     .attr('stop-color','#00000000')

    // // the path structure is built off of four coordinates with Z closing the shape
    // // learn the structure here https://css-tricks.com/svg-path-syntax-illustrated-guide/
    //     svg.append('path')
    //     .attr('d',`M${axis_padding},${y_axis(12.48)},V${top_padding},H${(width-axis_padding)},V${y_axis(12.8)},Z`)
    //     .attr('fill','url(#poly-grad)')

    
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

