import Drone from './drone';

jest.mock('./plugins/Action');
import Action from './plugins/Action';

describe('Drone', () => {
  let instance: Drone;
  beforeEach(() => {
    instance = new Drone('http://127.0.0.1', 10000);
  });

  it('should be ready after connect', () => {
    expect(instance).toBeInstanceOf(Drone);
    instance.connect();
    
    console.log(instance);

    expect(instance.isReady()).toBeTruthy();
  });
});