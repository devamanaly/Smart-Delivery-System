import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import sequelize from "../config/sequelize";
interface deliveryGuyAttributes {
  delivery_guy_id: number;
  name: string;
  email: string;
  hash_password: string;
  current_location: string;
  availability: boolean;
  created_at?: Date;
  updated_at?: Date;
  phone: string;
  date_of_birth: Date;
  gender: string;
  national_id_number: string;
  vehicle_type: string;
  vehicle_number_plate: string;
  driving_license_number: string;
  id_card_url?: string | null;
  license_doc_url?: string | null;
  profile_photo_url?: string | null;
}

interface deliveryGuyCreatationAttributes
  extends Optional<
    deliveryGuyAttributes,
    "delivery_guy_id" | "created_at" | "updated_at"
  > {}

class CreateDeliveryGuy extends Model<
  deliveryGuyAttributes,
  deliveryGuyCreatationAttributes
> {
  public delivery_guy_id!: number;
  public name!: string;
  public email!: string;
  public hash_password!: string;
  public current_location!: string;
  public availability!: boolean;
  public created_at?: Date;
  public updated_at?: Date;
  public phone!: string;
  public date_of_birth!: Date;
  public gender!: string;
  public national_id_number!: string;
  public vehicle_type!: string;
  public vehicle_number_plate!: string;
  public driving_license_number!: string;
  public id_card_url!: string;
  public license_doc_url!: string;
  public profile_photo_url?: string;
}
CreateDeliveryGuy.init(
  {
    delivery_guy_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hash_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    current_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    national_id_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_number_plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driving_license_number: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "driving_license_number", // Maps to the database column
    },
    id_card_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license_doc_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "delivery_guy",
    timestamps: true,
    underscored: true,
  }
);
export default CreateDeliveryGuy;
