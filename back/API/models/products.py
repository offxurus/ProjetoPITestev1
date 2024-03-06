import uuid

from modules.main import MainModule

class Products(object):

    _collection_name = 'Products'


    def __init__(self, **args):
        self.id = args.get('id',uuid.uuid4().hex)
        self.name = args.get('name')
        self.price = args.get('price')

    def save(self):
        """Save Products"""
        MainModule.get_firestore_db().collection(
            self._collection_name).document(self.id).set(self.to_dict())
        
    def to_dict(self):
        """Transform products in dict format"""
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
        }
    
    @classmethod
    def get_products(cls):
        """
        Get products
        """
        return MainModule.get_firestore_db().collection(
            cls._collection_name).limit(16).stream()