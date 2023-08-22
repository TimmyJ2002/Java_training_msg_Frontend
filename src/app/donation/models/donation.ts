import {Donator} from "../../donator/models/donator";
import {Campaign} from "../../campaign/model/campaign";

export class Donation {
  constructor(
    public currency: string,
    public campaign: Campaign,
    public donator: Donator,
    public notes: string,
    public id?: number,
    public amount?: number,
  ) {
  }

}
