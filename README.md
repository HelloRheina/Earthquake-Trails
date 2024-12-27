# Indonesia Earthquakes Visualization Web

This web application visualizes earthquake data in Indonesia, providing an interactive platform to explore earthquake events based on magnitude, depth, and frequency.

## Tools Used:
- **HTML**: For structuring the web page content.
- **CSS**: For styling and ensuring consistency across the web application.
- **JavaScript**: For interactive elements, including map navigation and dynamic visualization updates.
- **Leaflet**: A JavaScript library used to display interactive maps with earthquake markers.
- **MapTiler**: A platform used for enhancing map styling and providing custom maps for the geospatial visualization.
- **Figma**: Used for designing the project's logo, ensuring it was copyright-free.

## How to Use the Visualization:

### 1. **Navigating the Map**:
- **Zoom In/Out**: Use the scroll wheel on your mouse or the "+" and "-" buttons on the map to zoom in and out of the map. You can zoom into specific regions to see more detailed earthquake markers.
- **Pan the Map**: Click and drag the map to move it around and explore different areas of Indonesia. This will allow you to focus on specific regions where you might want to examine earthquake activity more closely.
- **Return to Original Zoom**: Right-click anywhere on the map and select "Reset Zoom" to return to the initial zoom level. This allows you to quickly return to the full view of the map after zooming in.
  
### 2. **Using the Year Slider**:
- At the top of the dashboard, you will find a **year slider**.
- Drag the slider to the left or right to select a specific year. The earthquake data and visualizations will dynamically update to reflect the earthquakes that occurred in that year.
  
### 3. **Viewing Earthquake Information**:
- **Click on Earthquake Markers**: On the geospatial map, click on any earthquake marker to view detailed information in a pop-up. The pop-up will display the following information:
  - **Magnitude**: The magnitude of the earthquake.
  - **Depth**: The depth of the earthquake beneath the surface.
  - **Date and Time**: The date and time when the earthquake occurred.
  
### 4. **Interacting with the Dashboard Visualizations**:
- **Yearly Frequency Histogram**: This histogram shows the number of earthquakes per year. The bars will change color as you slide the year slider to a specific year.
  - The active year is highlighted, and the bar color will update based on the selected year.
  
- **Depth-Magnitude Boxplot**: This boxplot shows earthquake magnitudes categorized by depth. It helps you understand how the depth of an earthquake affects its magnitude distribution.
  - Each depth category (Shallow, Intermediate, Deep) is represented by different colors.

- **Magnitude Frequency Line Graph**: This graph displays the frequency of earthquakes for different magnitude ranges.
  - The line graph will change dynamically based on the selected year from the slider.

### 5. **Using the Exact Number of Earthquakes Display**:
- The total number of earthquakes for the selected year is displayed below the frequency histogram. This provides users with an exact count of how many earthquakes occurred in the chosen year.
  
### 6. **Legend**:
- The **Legend** is located at the bottom right of the map and dashboard.
- It explains the color-coding system for earthquake depth:
  - **Shallow Earthquakes**: Typically shown in one color.
  - **Intermediate Earthquakes**: Shown in another color.
  - **Deep Earthquakes**: Represented with a third color.

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

