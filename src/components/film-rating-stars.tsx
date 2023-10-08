import { Label } from '@/components/ui/label';
import React from 'react';

export default function FilmRatingStars() {
  return (
    <>
      <div id="half-stars-example">
        <div className="rating-group">
          <input
            className="rating__input rating__input--none"
            checked
            name="rating2"
            id="rating2-0"
            value="0"
            type="radio"
          />
          <Label
            aria-label="0 stars"
            className="rating__label"
            htmlFor="rating2-0"
          >
            &nbsp;
          </Label>
          <Label
            aria-label="0.5 stars"
            className="rating__label rating__label--half"
            htmlFor="rating2-05"
          >
            <i className="rating__icon rating__icon--star fa fa-star-half"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-05"
            value="0.5"
            type="radio"
          />
          <Label
            aria-label="1 star"
            className="rating__label"
            htmlFor="rating2-10"
          >
            <i className="rating__icon rating__icon--star fa fa-star"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-10"
            value="1"
            type="radio"
          />
          <Label
            aria-label="1.5 stars"
            className="rating__label rating__label--half"
            htmlFor="rating2-15"
          >
            <i className="rating__icon rating__icon--star fa fa-star-half"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-15"
            value="1.5"
            type="radio"
          />
          <Label
            aria-label="2 stars"
            className="rating__label"
            htmlFor="rating2-20"
          >
            <i className="rating__icon rating__icon--star fa fa-star"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-20"
            value="2"
            type="radio"
          />
          <Label
            aria-label="2.5 stars"
            className="rating__label rating__label--half"
            htmlFor="rating2-25"
          >
            <i className="rating__icon rating__icon--star fa fa-star-half"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-25"
            value="2.5"
            type="radio"
            checked
          />
          <Label
            aria-label="3 stars"
            className="rating__label"
            htmlFor="rating2-30"
          >
            <i className="rating__icon rating__icon--star fa fa-star"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-30"
            value="3"
            type="radio"
          />
          <Label
            aria-label="3.5 stars"
            className="rating__label rating__label--half"
            htmlFor="rating2-35"
          >
            <i className="rating__icon rating__icon--star fa fa-star-half"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-35"
            value="3.5"
            type="radio"
          />
          <Label
            aria-label="4 stars"
            className="rating__label"
            htmlFor="rating2-40"
          >
            <i className="rating__icon rating__icon--star fa fa-star"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-40"
            value="4"
            type="radio"
          />
          <Label
            aria-label="4.5 stars"
            className="rating__label rating__label--half"
            htmlFor="rating2-45"
          >
            <i className="rating__icon rating__icon--star fa fa-star-half"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-45"
            value="4.5"
            type="radio"
          />
          <Label
            aria-label="5 stars"
            className="rating__label"
            htmlFor="rating2-50"
          >
            <i className="rating__icon rating__icon--star fa fa-star"></i>
          </Label>
          <input
            className="rating__input"
            name="rating2"
            id="rating2-50"
            value="5"
            type="radio"
          />
        </div>
      </div>
    </>
  );
}
