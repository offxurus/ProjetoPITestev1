"""Test user"""
import unittest

from main import app

from mock import patch
from mockfirestore import MockFirestore
from modules.user import UserModule
from models.user import User
from modules.utils import decrypt, encripty


class TestUser(unittest.TestCase):
    """Test user"""

    def setUp(self):
        self.mock_db = MockFirestore()
        self.patcher = patch(
            'modules.main.MainModule.get_firestore_db', return_value=self.mock_db)
        self.patcher.start()
        self.app = app.test_client()

    def tearDown(self):
        self.patcher.stop()
        self.mock_db.reset()

    def test_post_user(self):
        """ test post user """
        response = self.app.post(path='/users', json={})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.get_json()['message'], "Bad request not params for user create")

        user_params = {
            'cpf': '318.500.111-33',
            'name': 'Breno Bastos da Silva',
            'email': 'breno17contato@hotmail.com',
            'password': '12345',
            'group': 'admin'
        }

        response = self.app.post(path='/users', json=user_params)

        self.assertEqual(response.status_code, 200)
        response_json = response.get_json()
        self.assertIsNotNone(response_json)
        self.assertIsNotNone(response_json['id'])
        self.assertEqual(response_json['name'], user_params['name'])
        self.assertEqual(response_json['email'], user_params['email'])
        self.assertEqual(response_json['cpf'], user_params['cpf'])
        self.assertEqual(response_json['group'], user_params['group'])
        self.assertEqual(
           decrypt(response_json ['password']), user_params['password'])

        response = self.app.post(path='/users', json=user_params)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.get_json()['message'], "E-mail already registered")
            
        response = self.app.get(path='/user')

    def test_get_users(self):
        """ test get users """
        user_params = {
            'cpf': '318.500.111-33',
            'name': 'Breno Bastos',
            'email': 'breno17contato@hotmail.com',
            'password': '12345',
            'group': 'admin'
        }
        for _ in range(0, 2):
            UserModule.create(user_params)

        response = self.app.get(path='/users')
        self.assertEqual(len(response.get_json()['users']), 2)

    def test_user_sign_in(self):
        """ Test user sign in """
        user_params = {
            'cpf': '318.500.111-33',
            'name': 'Breno Bastos',
            'email': 'breno17contato@hotmail.com',
            'password': '12345',
            'group': 'admin'
        }

        response = self.app.post('/user-sign-in', json=user_params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {})

        self.app.post(path='/users', json=user_params)
        response = self.app.post('/user-sign-in', json=user_params)
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.get_json()['id'])

    def test_update_and_get_user(self):
        """ Test update user """
        user_params = {
            'cpf': '318.500.111-33',
            'name': 'Breno Bastos',
            'email': 'breno17contato@hotmail.com',
            'password': '12345',
            'group': 'admin'
        }
        user = UserModule.create(user_params)
        user_params['nome'] = 'Breno Bastos'
        user_params['cpf'] = '300.000.111-55'
        user_params['password'] = 'batata15'

        response = self.app.post('/user/{}'.format(user.id), json=user_params)
        

        response = self.app.get('/user/{}'.format(user.id))