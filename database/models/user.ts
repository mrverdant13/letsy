import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({
    required: true,
    minlength: 1,
    trim: true,
  })
  email!: string;

  @prop({
    minlength: 1,
  })
  name?: string;

  @prop({
    minlength: 1,
  })
  image?: string;
}

export const UserModel = getModelForClass(User);
