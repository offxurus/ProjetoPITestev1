"""Users view"""
from flask_restful import Resource
from flask import request
from modules.utils import decrypt
from models.user import User

from modules.user import UserModule


class UsersHandler(Resource):
    """Users handler"""

    def get(self):
        """Get Users"""
        try:
            response = {"users": []}
            users = User.get_users()
            for user in users:
                response['users'].append(user.to_dict())

            return response

        except Exception as error:
            return {
              'message': 'Error on get Users',
              'details': str(error)
            }, 500

    def post(self):
        """Create a new user"""
        try:
            request_params = request.json
            if not request.json:
                return {"message": "Bad request not params for user create"}, 400

            users = User.get_user_by_email(request_params['email'])
            for user in users:
                if user.to_dict():
                    return {"message": "E-mail already registered"}, 400

            user = UserModule.create(request_params)
            return user.to_dict()

        except Exception as error:
            return {
              'message': 'Error on create a new user',
              'details': str(error)

            }, 500
        
        
class UserHandler(Resource):
    """User handler"""

    def get(self, user_id):
        """Get User"""
        try:
            user = User.get_user(user_id)
            if user:
                return user.to_dict()
            return {}

        except Exception as error:
            return {
              'message': 'Error on get Users',
              'details': str(error)
            }, 500

    def post(self,user_id):
        """Update a user"""
        try:
            user = User.get_user(user_id)
            request_params = request.json
            if not request.json:
                return {"message": "Bad request not params for update user"}, 400
            if not user:
                return {"message": "user not found"}, 400
            user = UserModule.update(request_params)        

        except Exception as error:
            return {
              'message': 'Error on Update a user',
              'details': str(error)

            }, 500

class UserSignInHandler(Resource):
    """User Sign In handler"""

    def post(self):
        """Get Users"""
        try:
            if not request.json:
                return {"message": "Bad request not params for user sign in"}, 400
            request_params = request.json
            response = {}
            users = User.get_user_by_email(request_params['email'])
            
            for user in users:
                if user:
                    user = user.to_dict()
                    if decrypt(user['password']) == request_params['password']:
                        response['id'] = user['id']
                
            return response
        

        except Exception as error:
            return {
              'message': 'Error on get User',
              'details': str(error)
            }, 500
        
    
