function write_values_to_JSON(table_obj) {
    // Takes a JavaScript Table object, writes the table as Json to server.
    var json = JSON.stringify(table_obj) 

    var fs = require('fs');
    fs.writeFile('donut_data.json', json, 'utf-8', callback);
    console.log("[IO]: Graph data written ot server.");
}