App.ArticleController = Ember.ObjectController.extend({
    actions: {
        addToSaved: function() {
            var self = this;
            self.store.find('Saved').then(function(savedItems) {
                savedItems = savedItems || [];
                var article = self.get('model');
                var savedItem = {};

                savedItem.id = savedItems.get('length');
                savedItem.article = {
                    id: article.get('id'),
                    name: article.get('name'),
                    image: article.get('image'),
                    description: article.get('description')
                };

                self.store.createRecord('Saved', savedItem);
                self.transitionToRoute('saved');

            });
        }
    }
});

App.SavedController = Ember.ObjectController.extend({
    actions: {
        checkout: function() {
            // we get the list of all the subjects in 
            // the current saved and add it as a record 
            // to OrderHistory
            var self = this;

            self.store.find('Saved').then(function(savedItems) {
                var order = [];
                savedItems.forEach(function(savedItem) {
                    var article = savedItem.get('article');
                    order.push({
                        id: savedItem.get('id'),
                        article: {
                            id: article.id,
                            name: article.name,
                            image: article.image,
                            description: article.description
                        }
                    });
                });

                self.store.find('History').then(function(historyItems) {
                    historyItems = historyItems || [];
                    var historyItem = {};
                    historyItem.id = historyItems.get('length');
                    historyItem.order = order;

                    // Add items to order history
                    self.store.createRecord('History', historyItem);
                    self.transitionToRoute('history');

                    // Remove all Items from current saved
                    self.store.unloadAll('Saved');

                });
            });

        }
    }
});
