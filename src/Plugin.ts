
export interface PluginConstructor {
  new (path: string): PluginInterface;
}

export interface PluginInterface {
  path: string;
  ready: boolean;
  plugin: any;
}
