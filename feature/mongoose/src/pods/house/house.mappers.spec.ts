import * as model from 'dals';
import * as apiModel from './house.api-model';
import { mapHouseListFromApiToModel, mapListReviewsFromApiToModel } from './house.mappers';

describe('pods/house/house.mappers spec', () => {
  describe('mapHouseListFromApiToModel', () => {
    it('should return empty array when it feeds houseList equals undefined', () => {
      // Arrange
      const houseList: apiModel.House[] = undefined;

      // Act
      const result: model.House[] = mapHouseListFromApiToModel(houseList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when it feeds houseList equals null', () => {
      // Arrange
      const houseList: apiModel.House[] = null;

      // Act
      const result: model.House[] = mapHouseListFromApiToModel(houseList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when it feeds houseList equals empty array', () => {
      // Arrange
      const houseList: apiModel.House[] = [];

      // Act
      const result: model.House[] = mapHouseListFromApiToModel(houseList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return one mapped item in array when it feeds houseList with one item', () => {
      // Arrange
      const houseList: apiModel.House[] = [
        {
          _id: '1',
          name: 'Cortijo Paco Perez',
          summary: 'Maravilloso cortijo en la vega de Granada',
          image: 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
          address: {
            street: 'Calle Olivos nº5, Granada',
            country: 'Spain',
            market: 'Zaidin',
          },
          bedrooms: 4,
          beds: 6,
          bathrooms: 3,
          number_of_reviews: 2,
          reviews: [
            {
              _id: '01',
              date: '2022-02-09T12:30:00',
              reviewer_name: 'Paquito',
              comments: 'Estupenda casa. Altamente recomendable',
            },
            {
              _id: '02',
              date: '2022-02-01T12:30:00',
              reviewer_name: 'Clara',
              comments: 'Estancia muy buena. Dias estupendos',
            }
          ],
        },
      ];

      // Act
      const result: model.House[] = mapHouseListFromApiToModel(houseList);

      // Assert
      expect(result).toEqual([
        {
          _id: '1',
          name: 'Cortijo Paco Perez',
          summary: 'Maravilloso cortijo en la vega de Granada',
          images: {
            picture_url: 'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
          },
          address: {
            street: 'Calle Olivos nº5, Granada',
            country: 'Spain',
            market: 'Zaidin',
          },
          bedrooms: 4,
          beds: 6,
          bathrooms: 3,
          number_of_reviews: 2,
          reviews: [
            {
              _id: '01',
              date: new Date('2022-02-09T12:30:00'),
              reviewer_name: 'Paquito',
              comments: 'Estupenda casa. Altamente recomendable',
            },
            {
              _id: '02',
              date: new Date('2022-02-01T12:30:00'),
              reviewer_name: 'Clara',
              comments: 'Estancia muy buena. Dias estupendos',
            }
          ],
        },
      ]);
    });
  });
  describe('mapListReviewsFromApiToModel', () => {
    it('should return empty array when it feeds reviewList equals undefined', () => {
      // Arrange
      const reviewList: apiModel.Review[] = undefined;

      // Act
      const result: model.Review[] = mapListReviewsFromApiToModel(reviewList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when it feeds reviewList equals null', () => {
      // Arrange
      const reviewList: apiModel.Review[] = null;

      // Act
      const result: model.Review[] = mapListReviewsFromApiToModel(reviewList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when it feeds reviewList equals empty array', () => {
      // Arrange
      const reviewList: apiModel.Review[] = [];

      // Act
      const result: model.Review[] = mapListReviewsFromApiToModel(reviewList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return one mapped item in array when it feeds reviewList with one item', () => {
      // Arrange
      const reviewList: apiModel.Review[] = [
        {
          _id: '60c20a334bec6a37b08acec9',
          reviewer_name: 'test-name',
          date: '2021-07-28T12:30:00',
          comments: 'test-text',
        },
      ];

      // Act
      const result: model.Review[] = mapListReviewsFromApiToModel(reviewList);

      // Assert
      expect(result).toEqual([
        {
          _id: '60c20a334bec6a37b08acec9',
          reviewer_name: 'test-name',
          date: new Date('2021-07-28T12:30:00'),
          comments: 'test-text',
        },
      ]);
    });
  });
});
