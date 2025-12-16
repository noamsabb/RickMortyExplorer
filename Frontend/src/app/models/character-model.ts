export class CharacterModel {
  public _id!: string;
  public name!: string;
  public gender!: string;
  public status!: string;
  public image!: string;
  public type!: string;
  public species!: string;
  public origin!: { name?: string } | null;
  public location!: { name?: string } | null;
  public episode!: string[];
}
