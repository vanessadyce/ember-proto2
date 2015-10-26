App.Article = DS.Model.extend({
    name: DS.attr('string'),
    image: DS.attr('string'),
    description: DS.attr('string')
});

App.Saved = DS.Model.extend({
    article: DS.attr()
});

App.History = DS.Model.extend({
    order: DS.attr()
});

App.Article.reopenClass({
    FIXTURES: topics
});

App.Saved.FIXTURES = [];

App.History.FIXTURES = [];
