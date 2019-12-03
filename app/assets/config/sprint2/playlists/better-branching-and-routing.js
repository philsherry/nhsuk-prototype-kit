module.exports = {
  directory: 'prototyping/better-branching-and-routing',
  playlist: [
    {
      route: 'Do you know your NHS number: yes',
      routeStart: true,
      view: 'index',
    },
    {
      route: 'Do you know your NHS number: yes',
      routeEnd: true,
      view: 'answer-yes',
    },
    {
      route: 'Do you know your NHS number: no',
      routeStart: true,
      view: 'index',
    },
    {
      route: 'Do you know your NHS number: no',
      routeEnd: true,
      view: 'answer-no',
    },
    {
      route: 'Do you know your NHS number: maybe',
      routeStart: true,
      view: 'index',
    },
    {
      route: 'Do you know your NHS number: maybe',
      routeEnd: true,
      view: 'answer-maybe',
    },
    {
      route: 'Do you know your NHS number: who cares',
      routeStart: true,
      view: 'index',
    },
    {
      route: 'Do you know your NHS number: who cares',
      routeEnd: true,
      view: 'answer-who-cares',
    },
  ],
}
