export enum StateName {
  Unknown,
  WaitForScan,
  WaitQuantity,
  UpdateAmount,
  FindProduct,
  UnknownProduct,
  ReturnProduct,
  RemoveProductQuantity,
  Pay,
  WaitForPay,
  PaymentMethod,
  PayOK,
  PayError,
  WaitReturnQuantity,
}

export class StateManager {
  stateName: StateName;
  methods: Record<string, Function> = {};
  private static instance: Record<string, StateManager> = {};
  private constructor(stateName: StateName) {
    this.stateName = stateName;
  }

  static getInstance(state: StateName): StateManager {
    if (!StateManager.instance[state]) {
      StateManager.instance[state] = new StateManager(state);
    }
    return StateManager.instance[state];
  }

}
