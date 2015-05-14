/// <reference path="../../../dts/jasmine.d.ts" />
import {App} from '../../app/app';
import {Router} from 'aurelia-router';

class RouterStub extends Router{
  routes;
  configure(handler) {
    handler(this);
    return this;
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut
    , mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub(null, null);
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['','welcome'],  moduleId: './welcome', nav: true, title:'Welcome' });
  });

  it('should have a flickr route', () => {
     expect(sut.router.routes).toContain({ route: 'flickr', moduleId: './flickr', nav: true });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContain({ route: 'child-router', moduleId: './child-router', nav: true, title:'Child Router' });
  });
});
