Package.describe({
  summary: 'Meteor package to animate your template based on database event.'
});

Package.on_use(function(api, where) {
  api.add_files('meteor-animation-client.js', 'client');
  api.add_files('meteor-animation-server.js', 'server');
});

