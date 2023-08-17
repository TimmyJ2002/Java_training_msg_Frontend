import {Donator} from "../../donator/models/donator";

export class Donation {
  constructor(
    public amount: number,
    public currency: string,
    public campaignName: string,
    public donator: Donator,
    public notes: string
  ){
  }

}
