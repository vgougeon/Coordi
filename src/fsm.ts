import { StateName } from "./stateManager"

export class FSM {
  currentState: StateName = StateName.WaitForScan

  constructor() { }

  checkState(from: StateName, to: StateName, condition: boolean) {
    if (from === this.currentState && condition) {
      this.currentState = to;
      return true;
    }
    return false;
  }
}

