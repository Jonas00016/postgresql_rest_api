import {Table, Column, Model, PrimaryKey, DataType, IsUUID, Unique } from 'sequelize-typescript'

// create user model
@Table
export class User extends Model{
    // attribute uuid is marked as uuid and set as primary key
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
      })
    @Column
    uuid: string;

    @Column
    name: string

    // email address has to be unique
    @Unique
    @Column
    email: string

    @Column
    password: string
}
