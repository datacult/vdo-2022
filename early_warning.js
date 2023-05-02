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
        right: 50,
        top: 0,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 820//window.innerWidth
    const svgHeight = isMobile ? screen.height*1.2 : 400//window.innerHeight

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
                    update(1)
                }
            };
        
            visitsObserver.observe(visits);

            const registrations = document.querySelector('#registrations');
    
            const registrationsObserver = new IntersectionObserver(handleRegistrations, options);
        
            function handleRegistrations(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(2)
                }
            };
        
            registrationsObserver.observe(registrations);

            const states = document.querySelector('#states');
    
            const statesObserver = new IntersectionObserver(handleStates, options);
        
            function handleStates(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(3)
                }
            };
        
            statesObserver.observe(states);

    ////////////////////////////////////
    ////////// Stack the Data //////////
    //////////////////////////////////// 
    
    //Build the graph in here!
    var data = [{"group":'before',"s1":141448,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0},
            {"group":'after',"s1":644154,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0}]

    var subgroups = Object.getOwnPropertyNames(data[0]).slice(1)

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      const groups = data.map(d => (d.group))

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)
    
    ////////////////////////////////////
    ////////////// Scales //////////////
    //////////////////////////////////// 

    //update your scales to match the data! for now base this on the first view

    // Add X axis scale
      const x = d3.scaleBand()
        .domain(groups)
        .range([0, width*1.6])


    // Add Y axis scale
    var y = d3.scaleLinear()
        .domain([0, 700000])
        .range([height, 0]);   

      // color palette = one color per subgroup
      const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#1C0D32','#3F2687','#3F268780','#6941BD80','#6941BD99','#6941BD4d'])


    ////////////////////////////////////
    //////////// add to DOM ////////////
    ////////////////////////////////////
    
    // const rectHeight1 = 141.1;
    const rectWidth = 80;
    const rectHeight1 = y(141448);
    // const rectHeight2 = 644.1;
    const rectHeight2 = y(644154);
    const rectSpacing = 454;
    // const rectColor = '#1C0D32';
    const rectX= 0;
    var bar_font_fill = 'white';
    var axis_font_fill = 'black';
    var annot_font_fill = '#1C0D32';
    var font_family = 'Barlow';
    var font_size = '18px';
    var font_reg_weight = '400';
    var font_bold_weight = '700';
    var line_height = '25.2px';
    

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
        .attr('stop-color','#8979CC33')

        grad.append('stop')
        .attr('offset','105%')
        .attr('stop-color','#F7F8FF33')

    svg
            .selectAll("path")
            .data(stackedData.reverse())
            .join("path")
            .attr('id',d => 'gradient'+d.key)
            .attr('d',d => `M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${y(d[1][1])},L${rectX + rectWidth - 5},${y(d[0][1]) + 5},Z`)
            .attr('fill',d => (d.key == 's1') ? 'url(#poly-grad)' : '#F7F8FF00')

    
      svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .join("g")
          .attr('id',d => d.key)
          .attr("fill", d => color(d.key))
        .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(d => d)
          .join("rect")
            .attr("id",d => d.data.group)
            .attr("x", d => x(d.data.group))
            .attr("y", d => y(d[1]))
            .attr("height", d => height - y(d[1]))
            .attr("width",rectWidth)
            .attr('rx',10)

            
    //Create the first bar
    // svg.append('rect')
    //     .attr('id','bar1')
    //     .attr('width',rectWidth)
    //     .attr('height',height - rectHeight1)
    //     .attr('x',rectX)
    //     .attr('y',rectHeight1)
    //     .attr('fill',rectColor)
    //     .attr('rx',10)
    //     .attr('ry',10);
    
    //Add the value of the first bar
    svg.append('text')
        .attr('id','bar1text')
        .text('141,448')
        .attr('x',rectX + rectWidth / 2)
        .attr('y',rectHeight1 + 30)
        .style('text-anchor','middle')
        .style('fill',bar_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight);
    
    //Add the first bar's x-axis labels
    svg.append('text')
        .text('Prior to the SCOTUS decision')
        .attr('x',rectX + rectWidth / 2)
        .attr('y',height + 30)
        .style('text-anchor','middle')
        .style('fill',axis_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);
    
    svg.append('text')
        .text('June 10 – June 23')
        .attr('x',rectX + rectWidth / 2)
        .attr('y',height + 55)
        .style('text-anchor','middle')
        .style('fill',axis_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight);
    
    //Create the second bar
    // svg.append('rect')
    //     .attr('id','bar2')
    //     .attr('width',rectWidth)
    //     .attr('height',height - rectHeight2)
    //     .attr('x',rectX + rectWidth + rectSpacing)
    //     .attr('y',rectHeight2)
    //     .attr('fill',rectColor)
    //     .attr('rx',10)
    //     .attr('ry',10);

    //Add the value of the second bar
    svg.append('text')
        .attr('id','bar2text')
        .text('644,154')
        .attr('x',rectX + rectWidth + rectSpacing + rectWidth / 2)
        .attr('y',rectHeight2 + 30)
        .style('text-anchor','middle')
        .style('fill',bar_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight);
    
    //Add the second bar's x-axis labels
    svg.append('text')
        .text('After the SCOTUS decision')
        .attr('x',rectX + rectWidth + rectSpacing + rectWidth / 2)
        .attr('y',height + 30)
        .style('text-anchor','middle')
        .style('fill',axis_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);
    
    svg.append('text')
        .text('June 24 – July 7')
        .attr('x',rectX + rectWidth + rectSpacing + rectWidth  / 2)
        .attr('y',height + 55)
        .style('text-anchor','middle')
        .style('fill',axis_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight);

    svg.append('rect')
        .attr('x',width/2-77/2)
        .attr('y',height - 200)
        .attr('rx',17)
        .attr('ry',17)
        .attr('width','77px')
        .attr('height','33px')
        .attr('fill', '#F7F8FF');

    var textChart = svg.append('text')
        .attr('id','textChart')
        .style('text-anchor','left')
        .attr('y',rectHeight2)
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);

    textChart.append('tspan')
        .text('We saw this trend after the Supreme Court released its')
        .attr('dy',line_height)
        .attr('x',rectX);

    textChart.append('tspan')
        .text('decision concerning Dobbs vs. Jackson Womens Health')
        .attr('dy',line_height)
        .attr('x',rectX);

    textChart.append('tspan')
        .text('Organization on June 24, 2022')
        .attr('dy',line_height)
        .attr('x',rectX);

    var textChart2 = svg.append('text')
        .attr('id','textChart2')
        .style('text-anchor','left')
        .attr('y',rectHeight2)
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight)
        .style('opacity',0);

    textChart2.append('tspan')
        .text('Six states with abortion measures on the ballot saw')
        .attr('y',rectHeight2 + 100)
        .attr('dy',line_height)
        .attr('x',rectX);

    textChart2.append('tspan')
        .text('over a 430% increase in Vote.org tool users.')
        .attr('dy',line_height)
        .attr('x',rectX);

    textChart2.append('tspan')
        .text('We saw a nearly 1000% increase')
        .attr('y',rectHeight2 + 190)
        .attr('x',rectX);

    textChart2.append('tspan')
        .text('in registrations in Kansas alone.')
        .attr('dy',line_height)
        .attr('x',rectX);

    var textStates = svg.append('text')
        .attr('id','textStates')
        .style('text-anchor','left')
        .attr('x',rectX + rectWidth + rectSpacing + 100)
        .attr('y',rectHeight2 + 30)
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_reg_weight)
        .style('opacity',0);

    textStates.append('tspan')
        .attr('id','kentucky')
        .text('Kentucky')
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    textStates.append('tspan')
        .attr('id','michigan')
        .text('Michigan')
    //     .attr('y',y(24424))
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    textStates.append('tspan')
        .attr('id','kansas')
        .text('Kansas')
        // .attr('y',y(27341))
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    textStates.append('tspan')
        .attr('id','california')
        .text('California')
        // .attr('y',y(28351))
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    textStates.append('tspan')
        .attr('id','montana')
        .text('Montana')
        // .attr('y',y(28620))
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    textStates.append('tspan')
        .attr('id','vermont')
        .text('Vermont')
        // .attr('y',y(28781))
        .attr('x',rectX + rectWidth + rectSpacing + 100);

    var textGradient = svg.append('text')
        .attr('id','textGradient')
        .attr('x',width/2)
        .attr('y',height - 177)
        .style('text-anchor','middle')
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);

    textGradient.append('tspan')
        .attr('id','percentage')
        .text('+ 355%');

    textGradient.append('tspan')
        .attr('id','annotationline1')
        .text('increase in total')
        .attr('dy',line_height)
        .attr('x',width/2)
        .attr('y',height - 162);

    textGradient.append('tspan')
        .attr('id','annotationline2')
        .text('Vote.org visits')
        .attr('dy',line_height)
        .attr('x',width/2);

    var textGradient2 = svg.append('text')
        .attr('id','textGradient2')
        .attr('x',width/2)
        .attr('y',height - 177)
        .style('text-anchor','middle')
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);

    textGradient2.append('tspan')
        .attr('id','percentage')
        .text('+ 333%');

    textGradient2.append('tspan')
        .attr('id','annotationline1')
        .text('increase in individuals visiting the')
        .attr('dy',line_height)
        .attr('x',width/2)
        .attr('y',height - 162);

    textGradient2.append('tspan')
        .attr('id','annotationline2')
        .text('site to register to vote')
        .attr('dy',line_height)
        .attr('x',width/2);

    var textGradient3 = svg.append('text')
        .attr('id','textGradient3')
        .attr('x',width/2)
        .attr('y',height - 177)
        .style('text-anchor','middle')
        .style('fill',annot_font_fill)
        .style('font-family',font_family)
        .style('font-size',font_size)
        .style('font-weight',font_bold_weight);

    textGradient3.append('tspan')
        .attr('id','percentage')
        .text('+ 430%');

    textGradient3.append('tspan')
        .attr('id','annotationline1')
        .text('increase in Vote.org tool users')
        .attr('dy',line_height)
        .attr('x',width/2)
        .attr('y',height - 162);

    textGradient.style('opacity',1);
    textGradient2.style('opacity',0);
    textGradient3.style('opacity',0);
    //bar update function 
    function update_bar(data, step) {
        stackedData = d3.stack()
                .keys(subgroups)
                (data)

            stackedData.forEach(el => {
                svg.select('#'+el.key)
                .selectAll("rect")
                .data(el)
                .transition() // <---- Here is the transition
                .duration(1500) // 1.5 seconds
                .attr("y", d => { console.log(el.key + ':'+d[1])
                    return y(d[1])})
                .attr("height", d => height - y(d[1])) 

                if (step == 3) {
                    svg.select('#gradient'+el.key)
                    .transition() // <---- Here is the transition
                    .duration(1500) // 1.5 seconds
                    .attr('fill','url(#poly-grad)')
                    .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${y(el[1][1])},L${rectX + rectWidth - 5},${y(el[0][1]) + 5},Z`)
    
                } else {
                    svg.select('#gradient'+el.key)
                    .attr('fill',(el.key == 's1') ? 'url(#poly-grad)' : '#F7F8FF00')
                    .transition() // <---- Here is the transition
                    .duration(1500) // 1.5 seconds
                    .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${y(el[1][1])},L${rectX + rectWidth - 5},${y(el[0][1]) + 5},Z`)
    
                }
                
                })
    }
    
    //scroll update function 
    function update(step) {
        if(step==1) {
            y = d3.scaleLinear()
            .domain([0, 700000])
            .range([height, 0]);

            // d3.select('#percentage')
            //     .text('+ 355%');
            
            // d3.select('#annotationline1')
            //     .text('increase in total');
            
            // d3.select('#annotationline2')
            //     .text('Vote.org visits');

            textChart2.style('opacity',0)

            d3.selectAll('#textGradient')
                .transition().duration(1500).style('opacity',1)
            d3.selectAll('#textGradient2')
                .style('opacity',0)
            d3.selectAll('#textGradient3')
                .style('opacity',0)

            textStates.style('opacity',0)

            // d3.select('#gradient')
            //     .transition()
            //     .duration(1500)
            //     .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${(y(644154))},L${rectX + rectWidth - 5},${y(141448) + 5},Z`);

            // d3.select('#bar1')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(141448))
            //     .attr('height',height-y(141448));
            
            d3.select('#bar1text')
                .transition()
                .duration(1500)
                .text('141,448')
                .style('opacity',1)
                .style('fill',bar_font_fill)
                .attr('y',y(141448) + 30);  
                
            // d3.select('#bar2')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(644154))
            //     .attr('height',height-y(644154));

            data = [{"group":'before',"s1":141448,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0},
            {"group":'after',"s1":644154,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0}]

            update_bar(data,step)
            
            d3.select('#bar2text')
                .transition()
                .duration(1500)
                .text('644,154')
                .style('opacity',1)
                .style('fill',bar_font_fill)
                .attr('y',y(644154) + 30);


        } else if(step==2) {
            y = d3.scaleLinear()
            .domain([0, 42000])
            .range([height, 0]);

            // d3.select('#percentage')
            //     .text('+ 333%');
            
            // d3.select('#annotationline1')
            //     .text('increase in individuals visiting the');
            
            // d3.select('#annotationline2')
            //     .text('site to register to vote');

            textChart2.transition().duration(700).style('opacity',0)

            // textGradient.style('opacity',0)
            // textGradient2.transition().duration(1500).style('opacity',1)
            // textGradient3.style('opacity',0)

            d3.selectAll('#textGradient2')
                .transition().duration(1500).style('opacity',1)
            d3.selectAll('#textGradient')
                .style('opacity',0)
            d3.selectAll('#textGradient3')
                .style('opacity',0)

            textStates
            .transition()
            .duration(700).style('opacity',0)

            // d3.select('#gradient')
            //     .transition()
            //     .duration(1500)
            //     .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${(y(37171))},L${rectX + rectWidth - 5},${y(8583    ) + 5},Z`);

            // d3.select('#bar1')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(8583))
            //     .attr('height',height-y(8583));
            
            d3.select('#bar1text')
                .transition()
                .duration(1500)
                .text('8,583')
                .style('opacity',1)
                .style('fill',bar_font_fill)
                .attr('y',y(8583) + 30);  
                
            // d3.select('#bar2')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(37171))
            //     .attr('height',height-y(37171));

            data = [{"group":'before',"s1":8583,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0},
            {"group":'after',"s1":37171,"s2":0,"s3":0,"s4":0,"s5":0,"s6":0}]

            update_bar(data,step)
            
            d3.select('#bar2text')
                .transition()
                .duration(1500)
                .text('37,171')
                .style('opacity',1)
                .style('fill',bar_font_fill)
                .attr('y',y(37171) + 30);

        } else {

            y = d3.scaleLinear()
            .domain([0, 35000])
            .range([height, 0]);

            textChart2.transition().duration(1500).style('opacity',1)

            // textGradient.style('opacity',0)
            // textGradient2.style('opacity',0)
            // textGradient3.transition().duration(1500).style('opacity',1)

            d3.selectAll('#textGradient3')
                .transition().duration(1500).style('opacity',1)
            d3.selectAll('#textGradient2')
                .style('opacity',0)
            d3.selectAll('#textGradient')
                .style('opacity',0)

            textStates.transition().duration(1500).style('opacity',1)

            d3.select('#kansas')
                .attr('y',y(17341/2));

            d3.select('#michigan')
                .attr('y',y(17341+(7083/2)));

            d3.select('#california')
                .attr('y',y(17341+7083+(2917/2)));

            d3.select('#kentucky')
                .attr('y',y(17341+7083+2917+(1010/2)));

            d3.select('#montana')
                .attr('y',y(17341+7083+2917+1010+(269/2)));

            d3.select('#vermont')
                .attr('y',y(17341+7083+2917+1010+269+(161/2)));

            // d3.select('#gradient')
            //     .transition()
            //     .duration(1500)
            //     .attr('d',`M${rectX + rectWidth - 10},${height},H${rectX + rectWidth + rectSpacing + 10},V${(y(28771))},L${rectX + rectWidth - 5},${y(4324) + 5},Z`);

            // d3.select('#bar1')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(8583))
            //     .attr('height',height-y(8583));
            
            d3.select('#bar1text')
                .transition()
                .duration(1500)
                .text('4,324')
                .style('opacity',1)
                .style('fill',annot_font_fill)
                .attr('y',y(4324) - 10);  
                
            // d3.select('#bar2')
            //     .transition()
            //     .duration(1500)
            //     .attr('y',y(37171))
            //     .attr('height',height-y(37171));

            //KS, MI, CA, KY, MT, VT
            data = [{"group":'before',"s1":1361,"s2":815,"s3":1719,"s4":249,"s5":103,"s6":77},
            {"group":'after',"s1":17341,"s2":7083,"s3":2917,"s4":1010,"s5":269,"s6":161}]

            update_bar(data,step)
            
            d3.select('#bar2text')
                .transition()
                .duration(1500)
                .text('28,771')
                .style('opacity',1)
                .style('fill',annot_font_fill)
                .attr('y',y(28771) - 10);
                

        }

               

    }

})

