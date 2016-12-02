var provinces;
var percentage2015;
var percentage2013;
var averagePerRegion13;
var averagePerRegion15;
var averageCountry13;
var averageCountry15;
var index = 0;
var firstTime = true;
var chart;
var map = new Object(); // or var map = {};
map["North"] = 0;
map["Northeast"] = 1;
map["Central"] = 2;
map["East"] = 3;
map["South"] = 4;
//var fileName = "spanish-silver.csv";
var fileName = "forest_data.csv";
function parseData(createGraph) {
	Papa.parse("../data/"+fileName, {
		download: true,
		complete: function(results) {
			manageData(results.data);
			createGraph();
		}
	});
}

function manageData(data){
	if(firstTime){
		provinces = new Array(5);
		percentage2015 = new Array(5);
		percentage2013 = new Array(5);
		averagePerRegion13 = new Array(5);
		averagePerRegion15 = new Array(5);
		averageCountry13 = new Array(5);
		averageCountry15 = new Array(5);
		provinces[0] = ["x"];
		provinces[1] = ["x"];
		provinces[2] = ["x"];
		provinces[3] = ["x"];
		provinces[4] = ["x"];
		averagePerRegion13[0] = ["average per region 2013"];
		averagePerRegion13[1] = ["average per region 2013"];
		averagePerRegion13[2] = ["average per region 2013"];
		averagePerRegion13[3] = ["average per region 2013"];
		averagePerRegion13[4] = ["average per region 2013"];
		averagePerRegion15[0] = ["average per region 2015"];
		averagePerRegion15[1] = ["average per region 2015"];
		averagePerRegion15[2] = ["average per region 2015"];
		averagePerRegion15[3] = ["average per region 2015"];
		averagePerRegion15[4] = ["average per region 2015"];
		averageCountry13[0] = ["average of country 2013"];
		averageCountry13[1] = ["average of country 2013"];
		averageCountry13[2] = ["average of country 2013"];
		averageCountry13[3] = ["average of country 2013"];
		averageCountry13[4] = ["average of country 2013"];
		averageCountry15[0] = ["average of country 2015"];
		averageCountry15[1] = ["average of country 2015"];
		averageCountry15[2] = ["average of country 2015"];
		averageCountry15[3] = ["average of country 2015"];
		averageCountry15[4] = ["average of country 2015"];
		percentage2015[0] = ["percentage 2015"];
		percentage2015[1] = ["percentage 2015"];
		percentage2015[2] = ["percentage 2015"];
		percentage2015[3] = ["percentage 2015"];
		percentage2015[4] = ["percentage 2015"];

		percentage2013[0] = ["percentage 2013"];
		percentage2013[1] = ["percentage 2013"];
		percentage2013[2] = ["percentage 2013"];
		percentage2013[3] = ["percentage 2013"];
		percentage2013[4] = ["percentage 2013"];

		for (var i = 1; i < data.length-2; i++) {
			if(data[i][1]!="total"){
				provinces[ map[ data[i][0] ] ].push(data[i][1]);
				percentage2013[ map[ data[i][0] ] ].push(parseFloat(data[i][2]) );
				percentage2015[ map[ data[i][0] ] ].push(parseFloat(data[i][3]) );
				averageCountry13[ map[ data[i][0] ] ].push(parseFloat(data[data.length-2][2]));
				averageCountry15[ map[ data[i][0] ] ].push(parseFloat(data[data.length-2][3]));
			}else{
				for(var j = 0 ; j<provinces[ map[ data[i][0] ] ].length;j++) {
					averagePerRegion13[ map[ data[i][0] ] ].push(parseFloat(data[i][2]) );
					averagePerRegion15[ map[ data[i][0] ] ].push(parseFloat(data[i][3]) );
				}
			}

		}
	}
	firstTime = false;
	console.log(averagePerRegion15);
}

function createGraph() {
	 chart = c3.generate({
		bindto: '#chart',
	    data: {
				x: 'x',
	        columns: [
							provinces[index],
	            percentage2013[index],
							percentage2015[index],
							averagePerRegion13[index],
							averagePerRegion15[index],
							averageCountry13[index],
							averageCountry15[index],
	      ],
        type: 'bar',
				types: {
            'average per region 2013': 'line',
            'average per region 2015': 'line',
						'average of country 2013': 'line',
						'average of country 2015': 'line',
        },
		colors: {
			"average of country 2013": '#ff6347',
			"average of country 2015": '#ffd700',
			"average per region 2013": '#c71585',
			"average per region 2015" : '#bc15c7',
			"percentage 2013": '#00ff7f',
			"percentage 2015": '#006400'
		},
			},

			bar: {
        width: {
            ratio: 0.8 // this makes bar width 50% of length between ticks
        },
		
        // or
        //width: 100 // this makes bar width 100px
    	},
			axis: {
        y: {
            max: 100,
            min: 0,
        },
				x: {
            type: 'category',
            tick: {
                rotate: 75,
                multiline: false
            },
            height: 130
        }
    	},
	    zoom: {
        	enabled: true,
			rescale: true,
    	},
		
	    legend: {
	        position: 'right'
	    },
		
	});
}

function update() {
    chart.load({
        columns: [
					provinces[index],
					percentage2013[index],
					percentage2015[index],
					averagePerRegion13[index],
					averagePerRegion15[index],
					averageCountry13[index],
					averageCountry15[index],
					//percentage2013[index],
        ]
    });

		//console.log(provinces[index]);
}

function clickHandler() {
	index = (index+1)%5;
	update();
}

parseData(createGraph);
