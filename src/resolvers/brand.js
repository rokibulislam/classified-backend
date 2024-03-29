const { combineResolvers } = require('graphql-resolvers')
const { posts, users, categories, tags, brands } =  require('../constants')
const BrandModel = require('../models/brand')
const BrandService = require('../services/brand.service')

const { isAuthenticated } = require( '../middlewares')

module.exports = {
    
    Query: {
        brands: () => BrandService.getBrands(),
        brand: (_, { id } ) => BrandService.getBrand(id),
    },

    Brand: {

    },

    Mutation: {
        createBrand: combineResolvers( isAuthenticated, async (_, { input }, { email } ) => {
            return BrandService.createBrand(input);   
        }),

        updateBrand: combineResolvers( isAuthenticated, async (_, { input }, { email } ) => {
            return BrandService.updateBrand(input.id, input)
        }),

        deleteBrand: combineResolvers( isAuthenticated, async (_, { id }, { email } ) => {
            return BrandService.deleteBrand(id)
        })
    }
}