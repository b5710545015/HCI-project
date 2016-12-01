/*
 * Parse the data and create a graph with the data.
 */

var Years,silverMined;
var Year1 = [];
var silverMined1 = ["Silver Minted"];
var Year2 = [];
var silverMined2 = ["Silver Minted"];
var firstTime = true;
var	minY,maxY;

function parseData(createGraph) {
	Papa.parse("../data/spanish-silver.csv", {
		download: true,
		complete: function(results) {
			manageData(results.data);
			createGraph();
		}
	});
}

function manageData(data){
	if(firstTime){
		minY = parseInt(data[1][2]);
		maxY = parseInt(data[1][2]);
		for (var i = 1; i < data.length; i++) {
			if(i<data.length/2){
				Year1.push(data[i][0]);
				silverMined1.push(data[i][2]);
			}	else {
				Year2.push(data[i][0]);
				silverMined2.push(data[i][2]);
			}
			minY = ((parseInt(data[i][2])<minY) ? parseInt(data[i][2]):minY);
			maxY = ((parseInt(data[i][2])>maxY) ? parseInt(data[i][2]):maxY);
		}
		Years = Year1;
		silverMined = silverMined1;
	}
	firstTime = false;
}
function createGraph() {
	console.log(maxY);
	console.log(minY);
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	silverMined
	        ]
	    },
	    axis: {
        y: {
            max: maxY,
            min: minY,
        },
	        x: {
	            type: 'category',
	            categories: Years,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 15
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

function clickHandler() {
	if(Years==Year1){
		Years = Year2;
		silverMined = silverMined2;
	}else{
		Years = Year1;
		silverMined = silverMined1;
	}
	createGraph();
}

parseData(createGraph);
