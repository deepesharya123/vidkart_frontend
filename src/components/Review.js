import React from "react";

import "./Review.css";

import Person1 from "../images/person1.png";
import Person2 from "../images/person2.png";
import Star from "../images/StarFill.png";

const ReviewEnvelop = (props) => {
  const { message, name, rating, photo } = props;
  return (
    <div className="envelop">
      <div className="review_message">{message}</div>
      <div className="review_cover">
        <img className="photo" src={photo} />
        <div className="review_name">{name}</div>
        <img src={Star} className="star" />
        <div className="rating">{rating}</div>
      </div>
    </div>
  );
};

function Review() {
  return (
    <div className="review_head">
      <div className="review_question">What Customers say about VIDKART ?</div>
      <div className="reviews">
        <ReviewEnvelop
          message="Jorem ipsum dolo. velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
          name="John Doe"
          rating={4.5}
          photo={Person1}
        />
        <ReviewEnvelop
          message="Jorem ipsum dolor sit amet, libero et velit interdum, ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu."
          name="Ray Scart"
          rating={5}
          photo={Person2}
        />
      </div>
    </div>
  );
}

export default Review;
