App.Router.map(function() {
    // put your routes here
    this.route('subjects');

    this.route('article', {
        path: '/article/:article_id'
    });

    this.route('saved');

    this.route('history', function() {
        this.route('details', {
            path: '/details/:details_id'
        });
    });
});
