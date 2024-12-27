const key = 'jIaRK3AuvimbqZBbzBff';
const initialCenter = [-0.5489, 155.0149]; // Shifted to the right
const initialZoom = 4.4; // Slightly zoomed out
const histogramWidth = 200;
const histogramHeight = 100;
const marginHistogram = { top: 10, right: 10, bottom: 30, left: 40 };
const boxplotWidth = 200;
const boxplotHeight = 180;
const marginBoxplot = { top: 30, right: 20, bottom: 10, left: 30 };
const markerCluster = L.markerClusterGroup();

const categoryColorMap = {
    "Shallow": "#FF7627",   
    "Intermediate": "#A32EFF",
    "Deep": "#008EFF"   
};


function getDepthCategoryAndColor(depth) {
    if (depth >= 0 && depth < 70) return { category: "Shallow", color: categoryColorMap["Shallow"] };
    if (depth >= 70 && depth < 300) return { category: "Intermediate", color: categoryColorMap["Intermediate"] };
    if (depth >= 300) return { category: "Deep", color: categoryColorMap["Deep"] };
    return null;
}

const map = L.map('mapid', {
    center: initialCenter,
    zoom: initialZoom,
    minZoom: initialZoom,
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: false,
    maxBounds: [
        [-9, 80], 
        [8, 141]   
    ],
    maxBoundsViscosity: 1.0
});

const mtLayer = L.maptilerLayer({
  apiKey: key,
  style: L.MaptilerStyle.DATAVIZ.DARK, 
}).addTo(map);

map.on('contextmenu', function () {
    map.setView(initialCenter, initialZoom);
});
function circleSize(mag) {
    return mag * 10000;
}


let allEarthquakes = [];

d3.json("katalog_gempa.geojson").then(data => {
    allEarthquakes = data.features;


    const years = allEarthquakes.map(f => new Date(f.properties.tgl).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);

    const slider = document.getElementById('slider');
    slider.min = minYear;
    slider.max = maxYear;
    slider.value = minYear;

    document.getElementById('year-label').textContent = minYear;
    updateMarkers(minYear);
    slider.addEventListener('input', function () {
        const selectedYear = parseInt(this.value, 10);
        document.getElementById('year-label').textContent = selectedYear;
        updateMarkers(selectedYear);
    });
});

function circleStyle(depth) {
    return {
        stroke: true,
        color: getDepthCategoryAndColor(depth).color, 
        weight: 2, 
        fill: true, 
        fillOpacity: 0.1,
    };
}

function updateMarkers(year) {
    map.eachLayer(layer => {
        if (layer instanceof L.Circle) map.removeLayer(layer);
    });

    const filtered = allEarthquakes.filter(f => {
        const featureYear = new Date(f.properties.tgl).getFullYear();
        return featureYear === year; 
    });

    filtered.forEach(feature => {
        const [lng, lat, depth] = feature.geometry.coordinates;
        const mag = parseFloat(feature.properties.mag);

        L.circle([lat, lng], {
            ...circleStyle(depth), 
            radius: circleSize(mag)
        }).bindPopup(`
            <h3>${feature.properties.remark}</h3>
            <hr>
            <p>Date: ${feature.properties.tgl} ${feature.properties.ot}</p>
            <p>Magnitude: ${mag}</p>
            <p>Depth: ${depth} km</p>
        `).addTo(map);
    });
}

const svg = d3.select("#histogram")
    .attr("width", histogramWidth + marginHistogram.left + marginHistogram.right)
    .attr("height", histogramHeight + marginHistogram.top + marginHistogram.bottom)
    .append("g")
    .attr("transform", `translate(${marginHistogram.left}, ${marginHistogram.top})`);


const xScale = d3.scaleBand().range([0, histogramWidth]).padding(0.1);
const yScale = d3.scaleLinear().range([histogramHeight, 0]);

const xAxis = svg.append("g").attr("transform", `translate(0, ${histogramHeight})`);
const yAxis = svg.append("g");

function updateHistogram(year) {
    const yearCounts = d3.rollup(allEarthquakes, v => v.length, d => new Date(d.properties.tgl).getFullYear());
    const data = Array.from(yearCounts, ([year, count]) => ({ year, count })).sort((a, b) => a.year - b.year);

    xScale.domain(data.map(d => d.year));
    yScale.domain([0, d3.max(data, d => d.count)]);

    const bars = svg.selectAll(".bar").data(data, d => d.year);

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bars) // Update phase
        .attr("x", d => xScale(d.year))
        .attr("y", d => yScale(d.count))
        .attr("width", xScale.bandwidth())
        .attr("height", d => histogramHeight - yScale(d.count))
        .attr("fill", d => d.year === year ? "#FF7627" : "#A32EFF");

    bars.exit().remove();

    xAxis.call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    xAxis.selectAll(".tick text")
        .attr("opacity", d => d === year ? 1 : 0) 
        .attr("font-weight", d => d === year ? "bold" : "normal") // Highlight the current year
        .style("font-size", d => d === year ? "12px" : "10px");
    
    yAxis.call(d3.axisLeft(yScale));
        const selectedYearData = data.find(d => d.year === year);
        const count = selectedYearData ? selectedYearData.count : 0;
    
    const histogramOutput = document.querySelector(".histogram-output");
    histogramOutput.textContent = `${count} earthquakes happened in Indonesia`;
}
slider.addEventListener("input", function () {
    const selectedYear = parseInt(this.value, 10);
    document.getElementById("year-label").textContent = selectedYear;

    updateMarkers(selectedYear);
    updateHistogram(selectedYear);
});

function initializeHistogram() {
    const initialYear = slider.min; 
    updateHistogram(initialYear);
  }

initializeHistogram()

d3.json("katalog_gempa.geojson").then(() => {
    updateHistogram(minYear);
});

const boxplotSvg = d3.select("#boxplot")
    .attr("width", boxplotWidth + marginBoxplot.left + marginBoxplot.right)
    .attr("height", boxplotHeight + marginBoxplot.top + marginBoxplot.bottom)
    .append("g")
    .attr("transform", `translate(${marginBoxplot.left}, ${marginBoxplot.top})`);

const depthCategories = ["Shallow", "Intermediate", "Deep"];
const xScaleBox = d3.scaleBand()
    .domain(depthCategories)
    .range([0, boxplotWidth])
    .padding(0.2);

const yScaleBox = d3.scaleLinear()
    .domain([0.0, 9.9])  // Fixed range
    .range([boxplotHeight, 0]);

const xAxisBox = boxplotSvg.append("g")
    .attr("transform", `translate(0, ${boxplotHeight})`)
    .attr("class", "x-axis");

const yAxisBox = boxplotSvg.append("g")
    .attr("class", "y-axis");

yAxisBox.append("text")
    .attr("transform", "rotate(-90)")  
    .attr("y", 0 - marginBoxplot.left)  
    .attr("x", -boxplotHeight / 2)  
    .attr("dy", ".7em")  
    .attr("stroke", "white")
    .attr("text-anchor", "middle")  
    .text("Magnitude");

function updateBoxplot(year) {
    const filtered = allEarthquakes.filter(f => {
        const featureYear = new Date(f.properties.tgl).getFullYear();
        const depth = f.geometry.coordinates[2];
        return featureYear === year && getDepthCategoryAndColor(depth).category;
    });


    const groupedData = d3.group(filtered, f => getDepthCategoryAndColor(f.geometry.coordinates[2]).category);


    const boxplotData = depthCategories.map(category => {
        const data = groupedData.get(category) || [];
        const magnitudes = data.map(d => parseFloat(d.properties.mag));

        if (magnitudes.length === 0) return null;

        magnitudes.sort(d3.ascending);

        const q1 = d3.quantile(magnitudes, 0.25);
        const median = d3.quantile(magnitudes, 0.5);
        const q3 = d3.quantile(magnitudes, 0.75);
        const min = d3.min(magnitudes);
        const max = d3.max(magnitudes);

        return { category, min, q1, median, q3, max };
    }).filter(d => d !== null); 


    xAxisBox.call(d3.axisBottom(xScaleBox));

    yAxisBox.call(d3.axisLeft(yScaleBox));

    boxplotSvg.selectAll(".box",".text").remove();

    const boxes = boxplotSvg.selectAll(".box")
        .data(boxplotData, d => d.category);

    const newBoxes = boxes.enter()
        .append("g")
        .attr("class", "box");

newBoxes.append("rect")
    .attr("x", d => xScaleBox(d.category))
    .attr("y", d => yScaleBox(d.q3))
    .attr("width", xScaleBox.bandwidth())
    .attr("height", d => yScaleBox(d.q1) - yScaleBox(d.q3))
    .attr("fill", d => categoryColorMap[d.category]) 
    .attr("stroke", "white");

    newBoxes.append("line")
        .attr("x1", d => xScaleBox(d.category))
        .attr("x2", d => xScaleBox(d.category) + xScaleBox.bandwidth())
        .attr("y1", d => yScaleBox(d.median))
        .attr("y2", d => yScaleBox(d.median))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    newBoxes.append("line")
        .attr("x1", d => xScaleBox(d.category) + xScaleBox.bandwidth() / 2)
        .attr("x2", d => xScaleBox(d.category) + xScaleBox.bandwidth() / 2)
        .attr("y1", d => yScaleBox(d.min))
        .attr("y2", d => yScaleBox(d.q1))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    newBoxes.append("line")
        .attr("x1", d => xScaleBox(d.category) + xScaleBox.bandwidth() / 2)
        .attr("x2", d => xScaleBox(d.category) + xScaleBox.bandwidth() / 2)
        .attr("y1", d => yScaleBox(d.q3))
        .attr("y2", d => yScaleBox(d.max))
        .attr("stroke", "white")
        .attr("stroke-width", 2);
}

slider.addEventListener("input", function () {
    const selectedYear = parseInt(this.value, 10);
    updateBoxplot(selectedYear);
});

function initializeBoxplot() {
    const initialYear = slider.min;
    updateBoxplot(initialYear);
  }

initializeBoxplot()

d3.json("katalog_gempa.geojson").then(() => {
    updateBoxplot(minYear);
});


function createMagnitudeGraph(selectedYear) {
    const filteredData = allEarthquakes
        .filter(f => new Date(f.properties.tgl).getFullYear() === selectedYear)
        .map(f => f.properties.mag);

    // Create bins for magnitude frequencies (0.0 to 9.9 with 0.1 steps)
    const binSize = 0.1;
    const bins = d3.range(2, 8.1, binSize);
    const magnitudeBins = bins.map(binStart => ({
        magnitude: binStart,
        frequency: filteredData.filter(
            mag => mag >= binStart && mag < binStart + binSize
        ).length
    }));

    const width = 250;
    const height = 100;
    const margin = { top: 20, right: 10, bottom: 30, left: 35 };

    const container = d3.select("#magnitude-graph");

    container.select("svg").remove();

    const svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background", "rgba(255, 255, 255, 0.1)")
        .style("border-radius", "8px")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([2, 8.1]) 
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, 1400]) 
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickValues([2, 3, 4, 5, 6, 7, 8])) 
        .attr("color", "var(--text-color)");

    svg.append("g")
        .call(d3.axisLeft(yScale))
        .attr("color", "var(--text-color)");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom )
        .attr("text-anchor", "middle")
        .attr("fill", "var(--text-color)")
        .text("Magnitude (Richter)");

    const line = d3.line()
        .x(d => xScale(d.magnitude))
        .y(d => yScale(d.frequency))
        .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(magnitudeBins)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "var(--primary-color)")
        .attr("stroke-width", 2);

    svg.selectAll(".data-point")
        .data(magnitudeBins)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", d => xScale(d.magnitude))
        .attr("cy", d => yScale(d.frequency))
        .attr("r", 3)
        .attr("fill", "var(--secondary-color)");
}

document.getElementById('slider').addEventListener('input', function () {
    const selectedYear = parseInt(this.value, 10);
    createMagnitudeGraph(selectedYear);
});

const initialYear = parseInt(document.getElementById('slider').min, 10);
createMagnitudeGraph(initialYear);


