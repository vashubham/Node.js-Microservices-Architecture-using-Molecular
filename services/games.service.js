let obj_games = {
								  "g101": {name : "Game 1", price : 324, year : 2014, type : "FPS", origin : "Wonderland"},
									"g102": {name : "Game 2", price : 324, year : 2014, type : "FPS", origin : "Wonderland"},
									"g103": {name : "Game 3", price : 324, year : 2014, type : "FPS", origin : "Wonderland"},
								};
module.exports = {
	name: "games",
	//version: 2,

	settings: {
		rest: "/"
	},

	actions: {
		list: {
			cache: true,
			rest: "GET /",
			handler(ctx) {
        return (obj_games);
			}
		},


		get: {
			cache: {
				keys: ["id"]
			},
			rest: "GET /:id",
					handler(ctx) {
						try{
							console.log("CTX", ctx);
	        	return (obj_games[ctx.params.id]);
					}
								catch(ex)
			{
				return("id not found");
			}

				  }

		},

		create: {
			rest: "POST /",
			params : {somevalue : {type : "string", optional : true}},
			handler(ctx) {
				console.log("XSS", ctx.params);
				let game_name = ctx.params.name.substring(0,4);
				let obj_newgame = { game_name: {name : ctx.params.name, price : ctx.params.price, year : ctx.params.year, type : ctx.params.type, origin : ctx.params.origin}}
				obj_games= {...obj_games, ...obj_newgame};
				return obj_games;
			}
		},

		update: {
			rest: "PUT /:id",
			handler(ctx) {
				return("Not Available");
			}
		},

		remove: {
			rest: "DELETE /:id",
			handler(ctx) {
				delete obj_games[ctx.params.id];
				return obj_games;
			}
		}

	},

	methods: {

	},

	created() {

	}
};
