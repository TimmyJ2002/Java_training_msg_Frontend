import {Donator} from "../../donator/models/donator";

export class Donation {
  constructor(
    public currency: string,
    public campaignID: number,
    public donatorID: number,
    public notes: string,
    public id?: number,
    public amount?: number,
  ) {
  }

}
