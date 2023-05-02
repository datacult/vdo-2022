// © 2023 Data Culture
// Released under the ISC license.
// https://studio.datacult.com/ 

'use strict'

let youth_share = ((selector = '#youth_share', data) => {

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false

    data = [
        { category: "A", value: 12 },
        { category: "B", value: 5.7 },
    ];

    ////////////////////////////////////
    //////////// svg setup /////////////
    ////////////////////////////////////

    var body = d3.select(selector)
    body.html("")

    // margins for SVG
    const margin = isMobile ? {
        left: 200,
        right: 200,
        top: 50,
        bottom: 50
    } : {
        left: 200,
        right: 200,
        top: 50,
        bottom: 50
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width * 1.5 : 1000
    const svgHeight = isMobile ? screen.height * 1.2 : 250

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
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    ////////////////////////////////////
    //////////// Scales ////////////////
    //////////////////////////////////// 

    // Add color scale
    const colorScale = d3.scaleOrdinal()
        .domain(["A", "B"])
        .range(["#ffffff", "#D6D6F2"]);

    // Define the bar chart scales
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleBand().range([0, height]).paddingInner(0.3).paddingOuter(0.1);

    // Set the scale domains based on the data
    x.domain([0, d3.max(data, (d) => d.value)]);
    y.domain(data.map((d) => d.category));


    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 


    // Create and position the bars

    let bars = svg
        .selectAll(".bar")
        .data(data)
        .join("path")
        .attr("class", "bar")
        .attr("fill", d => colorScale(d.category))
        .attr("y", (d) => y(d.category))
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", 0)
        .attr("d", (d) => rightRoundedRect(0, y(d.category), 0, y.bandwidth(), 0));


    let bar_text = svg
        .selectAll(".bar_value")
        .data(data)
        .join("text")
        .attr("class", "bar_value")
        .attr("y", (d) => y(d.category) + (y.bandwidth() / 2))
        .attr("x", (d) => x(d.value) - 20)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "end")
        .style('font-weight', '700')
        .attr("opacity", 0)
        .text(d => d.value + "%")

    svg.append("text")
        .attr("x", -15)
        .attr("y", y("A") + (y.bandwidth() / 2) - 10)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text("Avg. youth share");

    svg.append("text")
        .attr("x", -15)
        .attr("y", y("A") + (y.bandwidth() / 2) + 10)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text("of the vote");

    svg.append("text")
        .attr("x", -15)
        .attr("y", y("B") + (y.bandwidth() / 2) - 10)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text("Avg. margins");

    svg.append("text")
        .attr("x", -15)
        .attr("y", y("B") + (y.bandwidth() / 2) + 10)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "end")
        .attr("fill", "white")
        .text("of victory");

    // update

    let transition_time = 1000

    bars
        .transition()
        .delay(function (d, i) { return transition_time * i; })
        .duration(transition_time)
        .attr("width", (d) => x(d.value))
        .attr("d", (d) => rightRoundedRect(0, y(d.category), x(d.value), y.bandwidth(), 10));

    bar_text
        .transition()
        .delay(function (d, i) { return (transition_time * i) + (transition_time / 2) + 200; })
        .duration(transition_time / 2)
        .attr("opacity", 1)


    function rightRoundedRect(x, y, width, height, radius) {
        return "M" + x + "," + y
            + "h" + (width - radius)
            + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
            + "v" + (height - 2 * radius)
            + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
            + "h" + (radius - width)
            + "z";
    }


    ////////////////////////////////////
    //////////// axis //////////////////
    //////////////////////////////////// 

    let axis_baseline = svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "white");

})

