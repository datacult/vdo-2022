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
        left: 20,
        right: 50,
        top: 50,
        bottom: 50
    } : {
        left: 0,
        right: 50,
        top: 75,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 850
    const svgHeight = isMobile ? screen.height*1.2 : 650

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    d3.selectAll(`${selector} svg`).remove();

    d3.selectAll(selector)
    .style('display','flex')
    .style('flex-direction','column')
    .style('align-items','center')
    .style('justify-content','center')

    const svg = d3.selectAll(selector)
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
    .domain([1,2,3,4,5,6,7])
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
    var bills2021 = 440, bills2022 = 408/*250*/, bills2023 = 150-3, total_bills = bills2021+bills2022+bills2023,
    stack_height = isMobile ? 125 : 100, start_x = 0, start_y = isMobile ? height-30 : height, wiggle = 3, col_space = isMobile ? 62 : 60

    var bill_group = svg.append('g')

    for (let i = 0; i < total_bills; i++) {
        
    var col = Math.ceil((i+1)/stack_height)-1, row = (i)%stack_height,
    group_year = (i < bills2021) ? "2021" : ((i < bills2021+bills2022) ? "2022" : "2023")
    
    bill_group.append('path')
        .attr('class','bill')
        .attr('id','b'+group_year)
        // .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('d',rotateScale(Math.floor((Math.random()*rotate_options)-1)))
        .attr('transform',`translate(${col*col_space+((Math.random() * wiggle) - wiggle)},${start_y-row*5})`)
        .style('fill',billScale(group_year))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    }

    var col_number = isMobile ? 8 : 10
    bill_group.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${col_number*col_space-20},${start_y})`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    bill_group.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${col_number*col_space-20},${start_y-20}) rotate(20)`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    bill_group.append('path')
        .attr('class','bill')
        .attr('id','b2023')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('transform',`translate(${col_number*col_space-25},${start_y-30}) rotate(10)`)
        .style('fill',billScale("2023"))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')


    d3.selectAll('#b2022').style('opacity',0)
    d3.selectAll('#b2023').style('opacity',0)

    var line_height = isMobile ? '32px' : '20px', font_size = isMobile ? '28px' : '16px', font_family = 'Barlow', font_fill = '#F7F8FF',
    x2021 = isMobile ? 0 : 4*col_space+col_space/2.5, 
    x2022 = isMobile ? 0 : 8*col_space+col_space/2.5, 
    x2023 = isMobile ? 0 : 10*col_space+col_space/2.5,
    texty = isMobile ? height/10 : height/3
    var text2021 = svg.append('text')
    .attr('id','text2021')
    .attr('x',x2021)
    .attr('y',texty)

    text2021.append('tspan')
    .text('In 2021, more than ')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2021.append('tspan')
    .text('440 bills')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)

    text2021.append('tspan')
    .text(isMobile ? ' with provisions': ' with')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)

    text2021.append('tspan')
    .text(isMobile ? 'that restrict voting access were introduced':'provisions that restrict voting access')
    .attr('dy',line_height)
    .attr('x',x2021)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2021.append('tspan')
    .text(isMobile ? 'in 49 states.':'were introduced in 49 states.')
    .attr('dy',line_height)
    .attr('x',x2021)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    var text2022 = svg.append('text')
    .attr('id','text2022')
    .attr('x',x2022)
    .attr('y',texty)

    text2022.append('tspan')
    .text(isMobile ? 'In 2022, legislators in at least 39 states':'In 2022, legislators in at least 39')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2022.append('tspan')
    .text(isMobile ? 'introduced, pre-filed, or carried over ':'states introduced, pre-filed, or')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2022.append('tspan')
    .text('carried over ')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .style('display',isMobile?'none':1)

    text2022.append('tspan')
    .text('408 bills')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)

    text2022.append('tspan')
    .text(' with')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)
    .style('display',isMobile?'none':1)

    text2022.append('tspan')
    .text(isMobile?'with restrictive provisions.':'restrictive provisions.')
    .attr('dy',line_height)
    .attr('x',x2022)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    var text2023 = svg.append('text')
    .attr('id','text2023')
    .attr('x',x2023)
    .attr('y',texty)

    text2023.append('tspan')
    .text('In the first month of 2023,')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2023.append('tspan')
    .text(' 150 voter')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)
    .style('display',isMobile?1:'none')

    text2023.append('tspan')
    .text(isMobile?'supression bills':'150 voter suppression bills')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',700)
    // .style('display',isMobile?'none':1)

    text2023.append('tspan')
    .text(isMobile?' in 32 states have already':' in 32')
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .attr('font-weight',400)

    text2023.append('tspan')
    .text(isMobile?'been introduced.':'states have already been')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)

    text2023.append('tspan')
    .text('introduced.')
    .attr('dy',line_height)
    .attr('x',x2023)
    .attr('font-family',font_family)
    .attr('font-size',font_size)
    .attr('fill',font_fill)
    .style('display',isMobile?'none':1)

    d3.selectAll('#text2022').style('opacity',0)
    d3.selectAll('#text2023').style('opacity',0)

    var data_source =  svg.append("text")
            .attr('x',start_x)
            .attr("y", height + 65)
            .text('Source: ')
            .style('font-family',font_family)
            .attr("alignment-baseline", "top")
            .attr("fill", "#f7f8ff")
            .style('font-size', '0.8em')
            .style('font-style','italic')

        data_source
            .append('a')
            .attr('href','https://www.brennancenter.org/')
            .attr('target','_blank')
            .append('tspan')
            .text('brennancenter.org')
            .attr("fill", "#f7f8ff")
            .style('font-family',font_family)


    var legend = ['2021','2022','2023'], legend_x = width-10, legend_r = isMobile ? 10 : 5

    legend.forEach((el, i) => {
        
        svg.append('text')
            .attr('class','legend'+el)
            .attr('x',isMobile ? start_x+legend_r*3 + i*100 : legend_x)
            .attr('y',isMobile ? height+42-legend_r/2 : height-i*35)
            .text(el)
            .attr('font-family',font_family)
            .attr('font-size',isMobile ? '20px' : font_size)
            .attr('fill',font_fill)
            .attr('font-weight',700)

        svg.append('circle')
            .attr('class','legend'+el)
            .attr('cx',isMobile ? start_x+legend_r + i*100 : legend_x-legend_r*3)
            .attr('cy',isMobile ? height+40-legend_r : height-i*30-legend_r)
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

