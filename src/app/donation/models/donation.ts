import {Donator} from "../../donator/models/donator";

export class Donation {
  constructor(
    public amount: number,
    public currency: string,
    public campaignID: number,
    public donatorID: number,
    public notes: string
  ){
  }

}
