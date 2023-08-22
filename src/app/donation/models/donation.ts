import {Donator} from "../../donator/models/donator";
import {Campaign} from "../../campaign/model/campaign";

export class Donation {
  constructor(
    public currency: string,
    public campaign: number,
    public donator: number,
    public notes: string,
    public id?: number,
    public amount?: number,
  ) {
  }

}
