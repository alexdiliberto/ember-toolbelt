/**
  Ember Google Analytics integration
*/

/**
  Page view tracking

  http://emberjs.jsbin.com/puzax/14/edit
*/
App.ApplicationRoute = Ember.Route.extend({
  actions: {
    didTransition: function() {
      Ember.run.once(this, function() {
        ga('send', 'pageview', this.router.get('url'));
      });
    }
  }
});

/**
  Action tracking

  http://emberjs.jsbin.com/puzax/47/edit
*/
var analyticsObject = Ember.Object.create({
	// Default data to be passed on every request
	_: { site: "My Webapp Name" },

	// Non route-based/global or fallback actions
	_global: {
		_trackPromise: function(r, s) { return { route: r, status: s }; },
	},

	// Route-specific - e.g. {{action "baz"}} in foo.bar
	//     foo: { //Route name
	//       bar: {  //Leaf-most route name
	//         baz: { var: 'borf' } //Action name
	//       }
	//     }
	products: {
		product: {
			vote: function(v, c, p) { return { vote: v, color: c, product: p }; },
			otherStuff: { var1: 'other-stuff' }
		}
	}
});

// Handles existing template {{action}}'s as well as programattic send()'s
//  {{action 'transferFunds'}}
//  this.send('_trackAppEvent', '_trackPromise', 'accounts#model', 'reject');
Ember.ActionHandler.reopen({
	send: function(actionName) {
		analyticsHandler.apply(this, arguments);
	}
});

var analyticsHandler = function(actionName) {
	var router = this.target ? this.target.router : this.router.router,
		activeTrans = router.activeTransition && router.activeTransition.targetName,
		curHandlerInfos = router.currentHandlerInfos,
		activeLeafMostRoute = curHandlerInfos[curHandlerInfos.length - 1].name,
		routeName = activeTrans || activeLeafMostRoute,
		trackObj = aObj.get(routeName+'.'+actionName) || aObj.get('_global.'+actionName);

	if (typeof trackObj == 'function') {
		trackObj = trackObj.apply(this, [].slice.call(arguments, 1));
	}
	if (trackObj) {
		analyticsSendHandlers.action(Em.Object.create(aObj.get('_'), trackObj));
	}
	if (actionName.indexOf('_track') !== 0) {
		this._super.apply(this, arguments);
	}
};