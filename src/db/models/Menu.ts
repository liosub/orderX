import { DataTypes, Model, Optional ,Sequelize,ModelAttributes} from 'sequelize'
import Profile from './Profile';
import Item from './Items';
import Order from './Order';


interface MenuAttributes{
    menu_id:number;
    menuTitle:string;
    menuDetails:string;
    font:string;
    accent:string;
    profile_id?:number;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface MenuInput extends Optional<MenuAttributes,'menu_id'>{}
export interface MenuOutput extends Required<MenuAttributes> {}


export const MENU_MODEL: ModelAttributes<Menu> = {
    menu_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      menuTitle: {
        type: DataTypes.STRING,
      },
 
      menuDetails: {
        type: DataTypes.STRING,
      },
      font: {
        type: DataTypes.STRING,
      },
      accent: {
        type: DataTypes.STRING,
      },
      profile_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'profile', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
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
export default class Menu extends Model<MenuAttributes,MenuInput> implements MenuAttributes{
    public menu_id!:number;
    public menuTitle!:string;
    public menuDetails!:string;
    public font!:string;
    public profile_id!:number;
    public accent!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;



static initModel(sequelize: Sequelize) {
  Menu.init(MENU_MODEL,
    {
      tableName: 'menu',
      sequelize, 
      paranoid: true,
      timestamps:false
    }
  );
}

static associate(_models: Model[]) {
    Menu.hasOne(Profile,{
        foreignKey :'profile_id'
    })
    Menu.hasMany(Order,{
      foreignKey :'menu_id'
  })
}
}