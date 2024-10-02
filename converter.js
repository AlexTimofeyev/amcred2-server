// // const fs = require('fs');
// // const path = require('path');

// // // Define the keys to keep
// // const keysToKeep = ["id", "name", "asciiname", "population"];

// // // Read the data from the file
// // const filePath = path.join(__dirname, 'output.json');
// // const data = fs.readFileSync(filePath, 'utf8');

// // // Parse the JSON data
// // const jsonData = JSON.parse(data);

// // // Filter and transform the data
// // const filteredData = jsonData.map(item => {
// //   const filteredItem = keysToKeep.reduce((acc, key) => {
// //     acc[key] = item[key] || "";
// //     return acc;
// //   }, {});
// //   return filteredItem;
// // }).filter(item => parseInt(item.population, 10) > 0);

// // // Convert the filtered list of objects to a JSON string
// // const jsonOutput = JSON.stringify(filteredData, null, 2);

// // // Save the JSON output to a file
// // const outputFilePath = path.join(__dirname, 'filtered_output.json');
// // fs.writeFileSync(outputFilePath, jsonOutput, 'utf8');

// // console.log('Filtered JSON data has been saved to filtered_output.json');

// const fs = require('fs');
// const path = require('path');

// // Define the keys to keep
// const keysToKeep = ["id", "name", "asciiname", "alternatenames", "population", "latitude", "longitude"];

// // Read the data from the file
// const filePath = path.join(__dirname, 'output.json');
// const data = fs.readFileSync(filePath, 'utf8');

// // Parse the JSON data
// const jsonData = JSON.parse(data);

// // Filter and transform the data
// const filteredData = jsonData.map(item => {
//   const filteredItem = keysToKeep.reduce((acc, key) => {
//     acc[key] = item[key] || "";
//     return acc;
//   }, {});
//   return filteredItem;
// });

// // Convert the filtered list of objects to a JSON string
// const jsonOutput = JSON.stringify(filteredData, null, 2);

// // Save the JSON output to a file
// const outputFilePath = path.join(__dirname, 'filtered_output.json');
// fs.writeFileSync(outputFilePath, jsonOutput, 'utf8');

// console.log('Filtered JSON data has been saved to filtered_output.json');



const fs = require('fs');
const path = require('path');

// Read the data from the file
const filePath = path.join(__dirname, 'filtered_output.json');
const data = fs.readFileSync(filePath, 'utf8');

// Parse the JSON data
const jsonData = JSON.parse(data);

// Function to extract Ukrainian and Russian names from alternatenames
function extractNames(alternatenames) {
  const names = alternatenames ? alternatenames.split(',') : [];
  const name_ru = names.find(name => /[А-Яа-яЁё]/.test(name)) || "";
  const name_uk = names.find(name => /[А-Яа-яЁёІЇЄҐієїґ]/.test(name)) || "";
  return { name_ru, name_uk };
}

// Process and transform the data
const updatedData = jsonData.map((item, index) => {
  const { alternatenames, asciiname, population, latitude, longitude } = item;
  const { name_ru, name_uk } = extractNames(alternatenames);
  return {
    id: index.toString(),
    slug: asciiname,
    population,
    latitude,
    longitude,
    name_ru,
    name: name_uk
  };
});

// Convert the updated list of objects to a JSON string
const jsonOutput = JSON.stringify(updatedData, null, 2);

// Save the JSON output to a file
const outputFilePath = path.join(__dirname, 'updated_output.json');
fs.writeFileSync(outputFilePath, jsonOutput, 'utf8');

console.log('Updated JSON data with modified records has been saved to updated_output.json');