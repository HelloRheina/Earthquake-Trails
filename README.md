# Indonesia Earthquakes Visualization Web

This web application visualizes earthquake data in Indonesia, providing an interactive platform to explore earthquake events based on magnitude, depth, and frequency.

## Tools Used:
- **HTML**: For structuring the web page content.
- **CSS**: For styling and ensuring consistency across the web application.
- **JavaScript**: For interactive elements, including map navigation and dynamic visualization updates.
- **Leaflet**: A JavaScript library used to display interactive maps with earthquake markers.
- **MapTiler**: A platform used for enhancing map styling and providing custom maps for the geospatial visualization.
- **Figma**: Used for designing the project's logo, ensuring it was copyright-free.

## Key Features:
The web application consists of two primary components: the **Geospatial Map** and the **Dashboard**.

### Geospatial Map:
The map is centered on Indonesia with initial coordinates of latitude -0.5489 and longitude 155.0149, providing a zoom level of 4.4 to visualize the entire Indonesian archipelago. It features:
- **Interactive map**: Zoom in and out to focus on specific regions.
- **Earthquake markers**: Each marker size reflects the magnitude of the earthquake, and the color represents its depth.
- **Pop-ups**: When clicked, each marker displays detailed information about the earthquake, including magnitude, depth, date, and time.

### Dashboard:
The dashboard integrates multiple data visualizations:
1. **Yearly Frequency Histogram**: Displays the number of earthquakes per year, allowing users to track trends over time. The histogram updates dynamically based on the selected year using an interactive slider.
2. **Depth-Magnitude Boxplot**: Shows how earthquake depth affects magnitude. Earthquakes are categorized into Shallow, Intermediate, and Deep categories, with quartile and median values presented.
3. **Magnitude Frequency Line Graph**: Displays the distribution of earthquake magnitudes in different frequency ranges to understand the most common magnitudes in the selected year.

### Extra Components:
- **Year Slider**: Filters the data to focus on earthquakes from a specific year.
- **Exact Number of Earthquakes**: Displays the total count of earthquakes for the selected year.
- **Legend**: Explains the color-coding system used in the map and dashboard, indicating the depth categories of earthquakes.

## Implementation Process:
1. **Data Processing**: The earthquake data from Kaggle was cleaned and structured for integration into the website. Unnecessary features like `dip1`, `dip2`, `strike1`, etc., were removed, and the data was converted to the GEOJSON format for use in the map.
2. **Color Scheme and Logo Design**: The color scheme was selected using **Coolors.co** to ensure it was accessible and aesthetically pleasing. A simple logo was designed using **Figma**, ensuring it was copyright-free.
3. **Leaflet and MapTiler Integration**: **Leaflet** was used for creating the interactive map, and **MapTiler** was integrated to provide custom map tiles, ensuring that the dark theme didn't interfere with the marker visibility.
4. **HTML, CSS, and JavaScript Adjustment**: HTML was used to structure the content, CSS for styling, and JavaScript to manage the interactive elements and update visualizations dynamically.

## Deployed Website:
click the link

## Future Improvements:
- **Earthquake Radius Estimation**: After further research, I found that there is no scientifically proven formula for estimating earthquake radius solely based on magnitude. Future versions may attempt to incorporate a more accurate calculation method based on factors like terrain, weather, and depth.
- **Geospatial Clustering**: Using **Leaflet Clusters** will optimize the map visualization by reducing visual clutter when displaying large datasets, making it easier to focus on specific regions.
- **Enhanced User Experience**: Future improvements include adding a depth frequency graph and transitions to enhance user interaction and data interpretation.

## Installation

### Prerequisites:
Before running the project, make sure you have the following installed on your system:
- **Node.js** (version 14 or later)
- **npm** (Node package manager)

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/HelloRheina/Indonesia-Earthquakes-Visualization.git
   cd Indonesia-Earthquakes-Visualization
   ```
2. Install the dependencies
      ```bash
   npm install
   ```
3. Obtain a MapTiler API key by signing up at MapTiler. After obtaining the key, insert it into the API KEY (js/script.js).
4. Start the development server
   ```bash
   npm start
    ```
5. Open your browser and go to http://localhost:3000 to view the interactive earthquake visualization.

Another way is by using http-server and run the website in localhost

