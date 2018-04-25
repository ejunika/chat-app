/* SystemJS module definition */
declare var module: NodeModule;
declare module 'chart.js';
declare module 'socket.io-client';
declare module "*.json" {
  const value: any;
  export default value;
}
interface NodeModule {
  id: string;
}
