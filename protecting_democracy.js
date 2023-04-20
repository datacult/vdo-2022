// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let protect = ((selector = '#protecting-democracy') => {

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
        left: 50,
        right: 50,
        top: 75,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 800
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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    /// scroll observer for initial load
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: [.5]
          };
    
            const bill21 = document.querySelector('#bills-2021');
    
            const bill21Observer = new IntersectionObserver(handleBill21, options);
        
            function handleBill21(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(1)
                }
            };
        
            bill21Observer.observe(bill21);

            const bill22 = document.querySelector('#bills-2022');
    
            const bill22Observer = new IntersectionObserver(handleBill22, options);
        
            function handleBill22(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(2)
                }
            };
        
            bill22Observer.observe(bill22);

            const bill23 = document.querySelector('#bills-2023');
    
            const bill23Observer = new IntersectionObserver(handleBill23, options);
        
            function handleBill23(entry, observer) {
                if (entry[0].intersectionRatio > .5) {
                    update(3)
                }
            };
        
            bill23Observer.observe(bill23);

    ////////////////////////////////////
    //////////// Scales ////////////
    //////////////////////////////////// 

    // Add radius axis scale
    const billScale = d3.scaleOrdinal()
        .domain(["2021","2022","2023"])
        .range(["#D6D6F2", "#B1A9E0", "#8979CC"]);

    var rotate_options = 7
    const rotateScale = d3.scaleOrdinal()
    // .domain([1,2,3,4,5])
    .domain([1,2,3,4,5,6,7])
    // .range(["M1.19083 19.2205L22.4209 0.838595L53.0609 13.3118L33.5126 33.4297L1.19083 19.2205Z", 
    //         "M1.37017 17.3918L23.8308 0.535599L53.5261 15.1158L32.622 33.821L1.37017 17.3918Z", 
    //         "M1.75 15.6583L25.8495 1.24219L53.8581 18.8465L31.1133 35.2642L1.75 15.6583Z",
    //         "M1.02563 13.8439L26.0721 1.14399L52.7844 20.6592L28.9498 35.4503L1.02563 13.8439Z",
    //         "M1.55779 15.4312L25.7822 1.22593L53.6361 19.074L30.7489 35.2925L1.55779 15.4312Z"]);
    // .range(["M1.12017 17.6047L23.5808 0.74849L53.2761 15.3287L32.372 34.0339L1.12017 17.6047Z", 
    // "M1.39901 16.2303L24.7111 0.572712L53.6025 16.6871L31.7482 34.2726L1.39901 16.2303Z", 
    // "M1.75 15.8673L25.8495 1.45117L53.8581 19.0555L31.1133 35.4731L1.75 15.8673Z",
    // "M0.88751 14.9561L25.4755 1.38989L52.8526 19.961L29.5487 35.5748L0.88751 14.9561Z",
    // "M1.77954 14.0568L26.826 1.35688L53.5383 20.8721L29.7037 35.6632L1.77954 14.0568Z"]);
    .range(["M1.12017 17.3606L23.5808 0.504349L53.2761 15.0845L32.372 33.7897L1.12017 17.3606Z", 
    "M1.16187 17.4474L24.1971 1.38531L53.3654 16.993L31.8213 34.9572L1.16187 17.4474Z", 
    "M1.45624 16.5304L25.038 1.28198L53.6438 17.8981L31.4859 35.0995L1.45624 16.5304Z",
    "M1.78125 15.6231L25.8808 1.20703L53.8893 18.8114L31.1446 35.229L1.78125 15.6231Z",
    "M0.888255 14.9385L25.3569 1.1582L52.895 19.4897L29.7283 35.3063L0.888255 14.9385Z",
    "M1.73771 14.2635L26.5587 1.12846L53.6075 20.1745L30.0347 35.3793L1.73771 14.2635Z",
    "M0.880644 13.5865L26.037 1.10567L52.5779 20.8533L28.6152 35.4358L0.880644 13.5865Z"]);

    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 
    
    //Build the graph in here!
    var bills2021 = 440, bills2022 = 250, bills2023 = 150-3, total_bills = bills2021+bills2022+bills2023,
    stack_height = 100, start_x = 0, start_y = height, wiggle = 3, col_space = 60


    for (let i = 0; i < total_bills; i++) {
        
    var col = Math.ceil((i+1)/stack_height)-1, row = (i)%stack_height,
    group_year = (i < bills2021) ? "2021" : ((i < bills2021+bills2022) ? "2022" : "2023")
    
    svg.append('path')
        .attr('class','bill')
        .attr('id','b'+group_year)
        // .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('d',rotateScale(Math.floor((Math.random()*rotate_options)-1)))
        .attr('transform',`translate(${col*col_space+((Math.random() * wiggle) - wiggle)},${height-row*5})`)
        .style('fill',billScale(group_year))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    }

    svg.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${9*col_space-20},${height})`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    svg.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${9*col_space-20},${height-20}) rotate(20)`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    svg.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${9*col_space-25},${height-30}) rotate(10)`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')


    d3.selectAll('#b2022').style('opacity',0)
    d3.selectAll('#b2023').style('opacity',0)

    var line_height = '20px', font_size = '16px', font_family = 'Barlow', font_fill = '#F7F8FF',
    x2021 = 4*col_space+col_space/2.5, x2022 = 7*col_space+col_space/2.5, x2023 = 8*col_space+col_space/2.5
    var text2021 = svg.append('text')
    .attr('id','text2021')
    .attr('x',x2021)
    .attr('y',height/3)

    text2021.append('tspan')
    .text('In 2021, more than ')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2021.append('tspan')
    .text('440 bills')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)

    text2021.append('tspan')
    .text(' with')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)

    text2021.append('tspan')
    .text('provisions that restrict voting access')
    .attr('dy',line_height)
    .attr('x',x2021)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2021.append('tspan')
    .text('were introduced in 49 states.')
    .attr('dy',line_height)
    .attr('x',x2021)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    var text2022 = svg.append('text')
    .attr('id','text2022')
    .attr('x',x2022)
    .attr('y',height/3)

    text2022.append('tspan')
    .text('In 2022, legislators in at least 27')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2022.append('tspan')
    .text('states introduced, pre-filed, or')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2022.append('tspan')
    .text('carried over ')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2022.append('tspan')
    .text('250 bills')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)

    text2022.append('tspan')
    .text(' with')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)

    text2022.append('tspan')
    .text('restrictive provisions.')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    var text2023 = svg.append('text')
    .attr('id','text2023')
    .attr('x',x2023)
    .attr('y',height/3)

    text2023.append('tspan')
    .text('In the first three months of 2023,')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2023.append('tspan')
    .text('150 voter suppression bills')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)

    text2023.append('tspan')
    .text(' in 32')
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)

    text2023.append('tspan')
    .text('states have already been')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    text2023.append('tspan')
    .text('introduced.')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font',font_size)
    .attr('fill',font_fill)

    d3.selectAll('#text2022').style('opacity',0)
    d3.selectAll('#text2023').style('opacity',0)


    var legend = ['2021','2022','2023'], legend_x = width-10, legend_r = 5

    legend.forEach((el, i) => {
        
        svg.append('text')
            .attr('class','legend'+el)
            .attr('x',legend_x)
            .attr('y',height-i*30)
            .text(el)
            .attr('font-family',font_family)
            .attr('font',font_size)
            .attr('fill',font_fill)
            .attr('font-weight',700)

        svg.append('circle')
            .attr('class','legend'+el)
            .attr('cx',legend_x-legend_r*3)
            .attr('cy',height-i*30-legend_r)
            .attr('r',legend_r)
            .style('fill',billScale(el))
    });

    d3.selectAll('.legend2022').style('opacity',0)
    d3.selectAll('.legend2023').style('opacity',0)
    
    
    //scroll update function 
    function update(step) {
        // update for step 1
            if (step == 1){

                d3.selectAll('#b2022').style('opacity',0)
                d3.selectAll('#b2023').style('opacity',0)
                d3.selectAll('.legend2022').transition().duration(1000).style('opacity',0)
                d3.selectAll('.legend2023').transition().duration(1000).style('opacity',0)
                d3.selectAll('#text2021').transition().duration(500).delay(500).style('opacity',1)
                d3.selectAll('#text2022').transition().duration(500).style('opacity',0)
                d3.selectAll('#text2023').transition().duration(500).style('opacity',0)

            }
        // update for step 2
            else if (step == 2){

                d3.selectAll('#b2022').style('opacity',1)
                d3.selectAll('#b2023').style('opacity',0)
                d3.selectAll('.legend2022').transition().duration(1000).style('opacity',1)
                d3.selectAll('.legend2023').transition().duration(1000).style('opacity',0)
                d3.selectAll('#text2021').transition().duration(500).style('opacity',0)
                d3.selectAll('#text2022').transition().duration(500).delay(500).style('opacity',1)
                d3.selectAll('#text2023').transition().duration(500).style('opacity',0)

            }
        // update for step 2
            else if (step == 3){

                d3.selectAll('#b2022').style('opacity',1)
                d3.selectAll('#b2023').style('opacity',1)
                d3.selectAll('.legend2022').transition().duration(1000).style('opacity',1)
                d3.selectAll('.legend2023').transition().duration(1000).style('opacity',1)
                d3.selectAll('#text2021').transition().duration(500).style('opacity',0)
                d3.selectAll('#text2022').transition().duration(500).style('opacity',0)
                d3.selectAll('#text2023').transition().duration(500).delay(500).style('opacity',1)
 
            }

               

    }

})

