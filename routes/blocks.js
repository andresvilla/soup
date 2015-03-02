var express= require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks={
	'Fixed': 'Fixed description',
	'Movable': 'Movable description',
	'Rotating': 'Rotating description'
};

router.route('/')
	.get(function(request, response){
		response.json(Object.keys(blocks));
	})

	.post(parseUrlencoded,function(request, response){
		var newBlock = request.body;
		blocks[newBlock.name]=newBlock.description;
		response.status(201).json(newBlock.name);
	});

router.route('/:name')
	.all(function(request,response,next){
		var name=request.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		request.blockName = block;
		next();
	})
	.get(function(request,response){
	
		var description = blocks[request.blockName];
		if(!description){
			response.status(404).json(request.params.name + " does not exists");
		}else{
			response.json(description);
		}
	})
	.delete(function(request,response){
		delete blocks[request.blockName];
		response.sendStatus(200);
	});


module.exports = router;