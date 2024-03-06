"""Users tasks view"""
from flask_restful import Resource
from flask import request
from modules.products import ProductsModule



class ProductsHandler(Resource):

    def post(self):
        """Create a new product"""
        try:
            if not request.json:
                return {"message": "Bad request not params for products create"}, 400

            products = ProductsModule.create(request.json)

            return products.to_dict()

        except Exception as error:
            return {
                'message': 'Error on create a new products',
                'details': str(error)
            }, 500