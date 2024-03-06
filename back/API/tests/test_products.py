"""Test products"""
import unittest

from main import app

from mock import patch
from mockfirestore import MockFirestore

from models.products import Products
from modules.utils import encripty

class TestProducts(unittest.TestCase):
    """Test products"""

    def setUp(self):
        self.mock_db = MockFirestore()
        self.patcher = patch(
            'modules.main.MainModule.get_firestore_db', return_value=self.mock_db)
        self.patcher.start()
        self.app = app.test_client()
    
    def tearDown(self):
        self.patcher.stop()
        self.mock_db.reset()

    def test_post_products(self):
        """ test create products """
        products_params = {"name": "Bola","price": 120.35}

        response = self.app.post(
            path='/products', json=products_params)
        self.assertEqual(response.status_code, 200)
        response_json = response.get_json()
        self.assertIsNotNone(response_json['id'])
        self.assertEqual(response_json['name'], products_params['name'])
        self.assertEqual(response_json['price'], products_params['price'])