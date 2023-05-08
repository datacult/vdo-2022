// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let youth_share_state = ((selector = '#youth_share_state', data) => {

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false

    data = [
        { state: "Georgia", difference: 12.1 },
        { state: "Arizona", difference: 9.2 },
        { state: "Wisconsin", difference: 8.8 },
    ];

    let bar_data = {
        "Georgia": [
            { category: "A", value: 13 },
            { category: "B", value: 0.9 }
        ],
        "Arizona": [
            { category: "A", value: 13 },
            { category: "B", value: 2.8 }
        ],
        "Wisconsin": [
            { category: "A", value: 11 },
            { category: "B", value: 2.2 }
        ]
    }

    ////////////////////////////////////
    //////////// svg setup /////////////
    ////////////////////////////////////

    var body = d3.select(selector)
    body.html("")

    // margins for SVG
    const margin = isMobile ? {
        left: 60,
        right: 50,
        top: 50,
        bottom: 50
    } : {
        left: 100,
        right: 50,
        top: 50,
        bottom: 50
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width * 1 : 1000
    const svgHeight = isMobile ? screen.height * .9 : 200

    // helper calculated variables for inner width & height
    const height = svgHeight - margin.top - margin.bottom
    const width = svgWidth - margin.left - margin.right

    let transition_time = 1000

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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    ////////////////////////////////////
    //////////// Scales ////////////////
    //////////////////////////////////// 

    // Add color scale
    const colorScale = d3.scaleOrdinal()
        .domain(["A", "B"])
        .range(["#f7f8ff", "#B1A9E0"]);

    var group_space = 50

    const groupSpaceY = d3.scaleOrdinal()
        .domain([0, 1, 2, 3])
        .range([0, 184 + group_space, 384 + group_space * 2, 525 + group_space * 3])


    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 

    data.forEach((d, j) => {

        var left_margin = 50

        var group_width = 250,
            per_row = isMobile ? 1 : 3,
            bar_transpose = 60

        var row = Math.ceil((j + 1) / per_row) - 1, col = (j) % per_row, bar_width = 50

        // Define the bar chart scales
        let x = d3.scaleLinear().range([0, group_width - left_margin - 40]);
        let y = d3.scaleBand().range([0, isMobile ? bar_width : height / (per_row*0.5)]).paddingInner(0.3).paddingOuter(0.1);

        // Set the scale domains based on the data
        x.domain([0, 13]);
        y.domain(["A", "B"]);

        var colScale = d3.scaleOrdinal()
            .domain([0, 1, 2])
            .range([0, width / 2 - group_width / 2, width - group_width])


        var state_group = svg.append('g')
            .attr('class', 'state-group')
            .attr('id', d.State)
            .attr('transform', isMobile ? `translate(${colScale(col)},${isMobile ? j*200: groupSpaceY(row)}) scale(1.2)`: `translate(${colScale(col)},${isMobile ? j*180: groupSpaceY(row)})`)


        state_group.append('image')
            .attr('class', 'state-outline')
            .attr('href', 'https://datacult.github.io/vdo-2022/assets/states/' + d.state + '.svg')
            .attr("opacity", 0.3)

        state_group.append('text')
            .attr('class', 'state-name')
            .attr('transform', 'translate(' + left_margin + ',20)')
            .text(d.state)
            .style('font-family', 'Barlow Semi Condensed')
            .style('font-size', '18px')
            .style('font-weight', '500')
            .style('fill', "#f7f8ff")

        var imp_text = state_group.append('text')
            .attr('class', 'difference')
            .attr('transform', 'translate(' + left_margin + ',40)')
            .text(d.difference + '%')
            .style('font-family', 'Barlow')
            .style('font-size', '12px')
            .style('fill', "#f7f8ff")

        imp_text.append('tspan')
            .text(' difference')
            .style('font-family', 'Barlow')
            .style('font-size', '12px')
            .style('fill', "#f7f8ff")

        let bars = state_group
            .selectAll(`.${d.state}_bar`)
            .data(bar_data[d.state])
            .join("path")
            .attr("class", `${d.state}_bar`)
            .attr("fill", d => colorScale(d.category))
            .attr("y", (d) => y(d.category))
            .attr("height", y.bandwidth())
            .attr("x", left_margin)
            .attr("width", 0)
            .attr("d", (d) => rightRoundedRect(left_margin, y(d.category) + bar_transpose, 0, y.bandwidth(), 0));


        let bar_text = state_group
            .selectAll(`.${d.state}_bar_value`)
            .data(bar_data[d.state])
            .join("text")
            .attr("class", `${d.state}_bar_value`)
            .attr("y", (d) => y(d.category) + (y.bandwidth() / 2) + bar_transpose)
            .attr("x", (d) => d.category == "A" ? x(d.value) - 10 + left_margin : x(d.value) + 10 + left_margin)
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", d => d.category == "A" ? "end" : "start")
            .attr("fill", d => d.category == "A" ? "#000000" : "#D6D6F2")
            .style('font-size', '0.6em')
            .style('font-weight', '500')
            .style('font-family', 'Barlow')
            .attr("opacity", 0)
            .text(d => d.value + "%")


        

        /// scroll observer for initial load
    let options = {
        root: null,
        rootMargin: "0px",
        threshold: [.5]
      };

        const shareST = document.querySelector(selector);

        const shareSTObserver = new IntersectionObserver(handleShareST, options);
    
        function handleShareST(entry, observer) {
            if (entry[0].intersectionRatio > .5) {
                update()
            }
        };
    
        shareSTObserver.observe(shareST);

   function update() {
    bars
    .transition()
    .delay(function (d, i) { return transition_time * i; })
    .duration(transition_time)
    .attr("width", (d) => x(d.value))
    .attr("d", (d) => rightRoundedRect(left_margin, y(d.category) + bar_transpose, x(d.value), y.bandwidth(), 3));

bar_text
    .transition()
    .delay(function (d, i) { return (transition_time * i) + (transition_time / 2) + 200; })
    .duration(transition_time / 2)
    .attr("opacity", 1)
    }

        ////////////////////////////////////
        //////////// axis //////////////////
        //////////////////////////////////// 

        let axis_baseline = state_group
            .append("line")
            .attr("x1", left_margin)
            .attr("x2", left_margin)
            .attr("y1", bar_transpose)
            .attr("y2", bar_transpose + (isMobile ? bar_width : height / (per_row * 0.5)))
            .attr("stroke-width", 0.5)
            .attr("stroke", "white");

    });

    function rightRoundedRect(x, y, width, height, radius) {
        return "M" + x + "," + y
            + "h" + (width - radius)
            + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
            + "v" + (height - 2 * radius)
            + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
            + "h" + (radius - width)
            + "z";
    }



})

