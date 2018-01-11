/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface NetworkState {
    state: string;
    isOnline: boolean
}

interface Network {
    stateChanged();
}

interface Window {
    network: Network;
}