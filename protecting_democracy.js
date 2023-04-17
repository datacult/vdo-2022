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
        left: 100,
        right: 100,
        top: 100,
        bottom: 100
    }

    // responsive width & height (adjusts ViewBox) - currently set for a full window view
    const svgWidth = isMobile ? screen.width*1.5 : 815
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

    ////////////////////////////////////
    //////////// add to DOM ////////////
    //////////////////////////////////// 
    
    //Build the graph in here!
    var bills2021 = 440, bills2022 = 250, bills2023 = 150, total_bills = bills2021+bills2022+bills2023


    for (let i = 0; i < total_bills; i++) {

    svg.append('path')
        .attr('class','bill')
        .attr('d','M1.05078 14.4804L24.0773 1.22266L50.8388 17.4124L29.1068 32.5108L1.05078 14.4804Z')
        .attr('x',0)
        .attr('y',0)
        .style('fill',(i < bills2021) ? billScale("2021") : ((i < bills2021+bills2022) ? billScale("2022") : billScale("2023")))
        .style('stroke-width','0.7px')
        .style('stroke','#1C0D32')

    }
    
    //scroll update function 
    function update(step) {
        // update for step 1
            if (step == 1){

                

            }
        // update for step 2
            else if (step == 2){

                             

            }
        // update for step 2
            else if (step == 3){

                

                
            }

               

    }

})

