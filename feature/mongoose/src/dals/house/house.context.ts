import mongoose, { Schema, SchemaDefinition } from 'mongoose';
import { House, Images ,Address, Review } from './house.model';

const imagesSchema = new Schema ({
  picture_url: { type: Schema.Types.String, required: true },
} as SchemaDefinition<Images>);

const addressSchema = new Schema ({
  country: { type: Schema.Types.String, required: true },
  street: { type: Schema.Types.String, required: true },
  market: { type: Schema.Types.String, required: true },
} as SchemaDefinition<Address>);

const reviewSchema = new Schema ({
  _id: { type: Schema.Types.String, required: true },
  date: { type: Schema.Types.Date, required: true },
  reviewer_name: { type: Schema.Types.String, required: true },
  comments: { type: Schema.Types.String, required: true },
} as SchemaDefinition<Review>);


const houseSchema = new Schema({
  _id: { type: Schema.Types.String, required: true },
  name: { type: Schema.Types.String, required: true },
  images: { type: imagesSchema, required: true },
  summary: { type: Schema.Types.String, required: true },
  address: { type: addressSchema, required: true },
  bedrooms: { type: Schema.Types.Number, required: true },
  beds: { type: Schema.Types.Number, required: true },
  bathrooms: { type: Schema.Types.Number, required: true },
  number_of_reviews: { type: Schema.Types.Number, required: true },
  reviews: [{ type: reviewSchema}],
} as SchemaDefinition<House>);


// he tenido que cambiar el nombrea "listinghouses" en la base de datos porque, el "listingsAndReviews" me lo pasaba a miniscula y no encontraba la coleccion
export const houseContext = mongoose.model<House>('listinghouses', houseSchema);

