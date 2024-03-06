""" Products Module """
from models.products import Products

class ProductsModule(object):
    """Products module"""

    @staticmethod
    def create(params):
        """
        Create new products
        :param params: products dict(JSON)
        return products: Products
        """
        products = Products()
        products.name = params['name']
        products.price = params['price']
        products.save()

        return products