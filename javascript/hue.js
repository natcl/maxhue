autowatch = 1;

var ajaxreq; 
var ip;
var key;
var config = new Dict;

function parse_config()
{
	try
	{
		config.import_json("maxhue_config.json");
		ip = config.get("ip");
		key = config.get("api_key");
	}
	catch(err)
	{
		post("there was an error");
	}
}
	
function set_ip(_ip)
{
	ip = _ip;
}
function set_key(_key)
{
	key = _key;
}
	

function get_lights()
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("GET",'http://' + ip + '/api/' + key +'/lights');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send();
}

function on(id, state)
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	if (state == 1)
		ajaxreq.send('{"on": true}');
	if (state == 0)
		ajaxreq.send('{"on": false}');
}

function brightness(id, bri)
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send('{"bri": ' + bri + '}');
}
	
// Here we fetch data and use javascript's internal JSON.parse method to read
// individual elements from and array of objects (aka dictionaries)
function readystatechange_parsejson()
{
	if (this.readyState ==4){
		post(this.responseText);
		post();
	}
}

parse_config();

