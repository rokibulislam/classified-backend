const { gql } = require('apollo-server-express')

module.exports = gql`

    extend type Query {
        coupons: [Coupon!],
        coupon(id: ID!): Coupon,
    }

    input createCouponInput {
        name: String!
    }

    extend type Mutation {
        createCoupon( input: createCouponInput ) : Coupon
        updateCoupon(id: ID!, input: createCouponInput ) : Coupon
        deleteCoupon(id: ID!) : Coupon
    }

    type Coupon {
        id: ID!
        name: String!
    }
`;