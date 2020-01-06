//Step 1:  Build SVG dimensions
var svgWidth= 400;
var svgHeight=500;

var margin = {
    top:20,
    right: 40,
    bottom: 60,
    left: 50
};

width = svgWidth - margin.left - margin.right;
height = svgHeight - margin.bottom -margin.top;

// Step 2: Build Wrapper 
var svg = d3
    .select(".scatterPlot")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight);

// Step 3: Shift Graphic from Top-Left to desired location
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 4: Data Load Function and unpack data object
function dataSetup(){
    d3.csv("assets/data/data.csv"),then(function(error, data){
        if(error) throw error;

        data.forEach(function(hData){
            hData.id= +hData.id;
            hData.state= +hData.state;
            hData.abbr= +hData.abbr;
            hData.poverty= +hData.poverty;
            hData.povertyMoe = +hData.povertyMoe;
            hData.age = +hData.age;
            hData.ageMoe = +hData.ageMoe;
            hData.income = +hData.income;
            hData.incomeMoe = +hData.incomeMoe;
            hData.healthcare = +hData.healthcare;
            hData.healthcareLow = +hData.healthcareLow;
            hData.healthcareHigh = +hData.healthcareHigh;
            hData.obesity = +hData.obesity;
            hData.obesityLow = +hData.obesityLow;
            hData.obesityHigh = +hData.obesityHigh;
            hData.smokes = +hData.smokes;
            hData.smokesLow = +hData.smokesLow;
            hData.smokesHigh = +hData.smokesHigh;
        });
    });    


        // Step 5: Build Scales
        var xScale = d3.xScale()
            .domain(d3.extend(hData,d=> d.poverty))
            .range([0,width]);

        var yScale = d3.yScale()
            .domain(d3.extend(hData,d=> d.healthcare))
            .range([height,0]);

        // Step 6: Create Axis Fuctions with Axis Titles
        var bottomAxis= d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);

        chartGroup.append("g")
            .attr("transform",'translate(0, ${height})')
            .call(bottomAxis);

        chartGroup.append("g")
            .attr("transfrom",'translate (${width},0')
            .call(leftAxis);

        chartGroup.append("text")
            .attr("transform",'translate(${width/2},${height + margin.top + 20})')
            .classed("x-axis text",true)
            .text("In Poverty %");
        
        chartGroup.append("text")
        .attr("transform",'translate(${width/2},${height + margin.top + 20})')
        .classed("y-axis text",true)
        .text("Lack Healthcare %");

        // var circleGroup = chartGroup.selectAll("circle")
        //     .data(hdata)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", (d, i)=> xScale(i))
        //     .attr("cy", (d,i)=> yScale(d))
        //     .attr("r","5")
        //     .attr("fill","red"); 
    
};
