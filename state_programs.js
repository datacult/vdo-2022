// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let state_programs = ((selector = '#state-programs', data) => {

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
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 1000
    const svgHeight = isMobile ? screen.height*1.2 : 900

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    // add SVG
    d3.select(`${selector} svg`).remove();

    const svg = d3.select(selector)
        .append('svg')
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        .append('g')
        // .attr('id','map-group')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    ////////////////////////////////////
    //////////// Scales ////////////
    //////////////////////////////////// 

    // Add color scale
    const colorScale = d3.scaleOrdinal()
        .domain(["Radio","Streaming","Reminders","Peer"])
        .range(["#6941BD", "#FF9995", "#819DFF", "#D6D6F2"]);

    var radius = 5.5

    const circleScale = d3.scaleLinear()
        .domain([0,250000])
        .range([2,radius])

    var group_space = 50    

    const groupSpaceY = d3.scaleOrdinal()
        .domain([0,1,2,3])
        .range([0,184+group_space, 384+group_space*2, 525+group_space*3])

    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 
    
    //Build the graph in here!

    function convertNum(value){
        var num = parseInt(value.replace(/,/g, ""))/1000000
        return num.toFixed(1)
    }

    // data = [data[0],data[1],data[2]]

    data.forEach((d,j) => {

    var group_width = 250,
    per_row = 3

    var row = Math.ceil((j+1)/per_row)-1, col = (j)%per_row

    var colScale = d3.scaleOrdinal()
        .domain([0,1,2])
        .range([0,width/2-group_width/2,width-group_width])
        
    var left_margin = 90

    var state_group = svg.append('g')
        .attr('class','state-group')
        .attr('id',d.State)
        .attr('transform',`translate(${colScale(col)},${groupSpaceY(row)})`)

    
    state_group.append('image')
        .attr('class','state-outline')
        .attr('href','assets/states/'+d.State+'.svg')

    state_group.append('text')
        .attr('class','state-name')
        .attr('transform','translate('+left_margin+',20)')
        .text(d.State)
        .style('font-family','Barlow Semi Condensed')
        .style('font-size','24px')
        .style('fill','#1C0D32')

    var imp_text = state_group.append('text')
        .attr('class','total-impressions')
        .attr('transform','translate('+left_margin+',50)')
        .text(convertNum(d.Total)+' M')
        .style('font-family','Barlow')
        .style('font-size','16px')
        .style('fill','#1C0D32')
        .style('font-weight','700')

    imp_text.append('tspan')
        .text(' Impressions')
        .style('font-family','Barlow')
        .style('font-size','16px')
        .style('fill','#1C0D32')
        .style('font-weight','400')

    var radio_dots = Math.ceil(parseInt(d.Radio.replace(/,/g, ""))/250000),radio_remain = parseInt(d.Radio.replace(/,/g, ""))%250000,
        streaming_dots = Math.ceil(parseInt(d.Streaming.replace(/,/g, ""))/250000),streaming_remain = parseInt(d.Streaming.replace(/,/g, ""))%250000,
        reminder_dots = Math.ceil(parseInt(d.Reminders.replace(/,/g, ""))/250000),reminder_remain = parseInt(d.Reminders.replace(/,/g, ""))%250000,
        peer_dots = d.Peer ? Math.ceil(parseInt(d.Peer.replace(/,/g, ""))/250000) : 0,peer_remain = d.Peer ? parseInt(d.Peer.replace(/,/g, ""))%250000 : 0,
        total_dots = radio_dots+streaming_dots+reminder_dots+peer_dots

    for (let i = 0; i < total_dots; i++) {
        var start_x = left_margin+radius, start_y = 70+radius,
        num_per_row = 10, space = radius*2

        var row = Math.ceil((i+1)/num_per_row)-1, col = (i)%num_per_row

        console.log(radio_remain+' '+streaming_remain+' '+reminder_remain+' '+peer_remain)
        console.log(circleScale(20000))

        state_group.append('circle')
            .attr('class','impression-circle')
            .attr('id','circ'+i)
            // .attr('r',radius)
            // .attr('r',(i == radio_dots-1) ? circleScale(radio_remain) : circleScale(250000))
            .attr('r',(i == radio_dots-1) ? circleScale(radio_remain) : ((i == radio_dots+streaming_dots-1) ? circleScale(streaming_remain) : ((i == radio_dots+streaming_dots+reminder_dots-1) ? circleScale(reminder_remain) : ((i == radio_dots+streaming_dots+reminder_dots+peer_dots-1) ? circleScale(peer_remain) : (circleScale(250000))))))
            .attr('cx',start_x+(radius+space)*col)
            .attr('cy',start_y+(radius+space)*row)
            .attr('fill',(i < radio_dots) ? colorScale("Radio") : ((i < radio_dots+streaming_dots) ? colorScale("Streaming") : ((i < radio_dots+streaming_dots+reminder_dots) ? colorScale("Reminders") : colorScale("Peer"))))
    }

    });
    
    


})

