import { getDBInstance } from 'core/servers';
import { HouseRepository } from './house.repository';
import { House } from '../house.model';
import { Review } from '..';


export const dbRepository: HouseRepository = {
  getHouseList: async (page, pageSize, country) => {
    const db = getDBInstance();
    let toSkip = 0;
    let toLimit = 6;
    if(pageSize && page){
      toSkip = (page-1)*pageSize;
      toLimit = pageSize;
    }

    if(country !== "undefined" && country){
      return await db.collection<House>('listingsAndReviews').find(
        {
        "address.country": {$regex: country, $options:'i'},
        },
        ).skip(toSkip).limit(toLimit).toArray();
    }
    return await db.collection<House>('listingsAndReviews').find().skip(toSkip).limit(toLimit).toArray();
  },
  getHouse: async (id: string) => {
    const db = getDBInstance();
    return await db.collection<House>('listingsAndReviews').findOne({
      _id: id,
    });
  },
  insertReview: async (review: Review,id: string) => {
    const db = getDBInstance();

    const value  = await db.collection<House>('listingsAndReviews').findOne(
      {
        _id: id,
      },
    );

    review._id = (value.number_of_reviews+1).toString();

    await db.collection<House>('listingsAndReviews').findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: {reviews: review},
        $inc: {number_of_reviews: 1}

      },
      { upsert: true, returnDocument: 'after' }
    );
    return review;
  },
};

