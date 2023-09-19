import PropTypes from 'prop-types';
import React, { useMemo, useState } from "react";
import { AiFillStar } from 'react-icons/ai';

const Rating = ({ count, rating, color, OnRating}) => {

    const [hoverRating, setHoverRating] = useState(0);
    const getColor = index => {
        if (hoverRating >= index) {
            return color.filled;
        }else if(!hoverRating && rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    }

    const starRating = useMemo(() => {

        return Array(count)
                    .fill(0)
                    .map((_, i) => i + 1)
                    .map((idx) => (
                        <AiFillStar
                            key={idx}
                            className='cursor-pointer'
                            icon="star"
                            onClick={()=>OnRating(idx)}
                            style={{color: getColor(idx)}}
                            onMouseEnter={() => setHoverRating(idx)}
                            onMouseLeave={() => setHoverRating(0)}
                            
                        />
                    )
    )}, [count, rating, OnRating]);





    return (
        <div>
            {starRating}
        </div>
    )
};

Rating.propTypes ={
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    },
}

Rating.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "#DCDCDC",
    }
}

export default Rating