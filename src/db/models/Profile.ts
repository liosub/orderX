import { DataTypes, Model, Optional ,Sequelize,ModelAttributes} from 'sequelize'
import Order from './Order';


interface ProfileAttributes{
    profile_id:number;
    email:string;
    password:string;
    businessName:string;
    tag:string;
    logo?:string;
    bannerImage?:string;
    url?:string;
    QRCode:string;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface ProfileInput extends Optional<ProfileAttributes,'profile_id'>{}
export interface ProfileOutput extends Required<ProfileAttributes> {}


export const PROFILE_MODEL: ModelAttributes<Profile> = {
    profile_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      businessName: {
        type: DataTypes.STRING,
        unique: true
      },
      tag: {
        type: DataTypes.TEXT
      },
      logo: {
        type: DataTypes.STRING,
      },
      bannerImage: {
        type: DataTypes.STRING,
      },
      QRCode: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }
export default class Profile extends Model<ProfileAttributes,ProfileInput> implements ProfileAttributes{
    public profile_id!:number;
    public email!:string;
    public password!:string;
    public businessName!:string;
    public tag!:string;
    public logo!:string;
    public bannerImage!:string;
    public url!:string;
    public QRCode!:string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;



public static associations: {};

static initModel(sequelize: Sequelize) {
  Profile.init(PROFILE_MODEL,
    {
      tableName: 'profile',
      sequelize, 
      paranoid: true,
      timestamps:false
    }
  );
}

static associate(_models: Model[]) {
  Profile.hasMany(Order,{
    foreignKey :'profile_id'
})
}}  