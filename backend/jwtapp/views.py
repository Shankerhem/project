from django.shortcuts import render
import jwt
import time
import base64
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

l=[{
    "email" : "tusharanumula@gmail.com",
    "password" : "123456",
    "userId":"1"
}]

@api_view(['GET','POST'])
def login(request):
    print(l)
    email = request.data.get("email")
    pwd = request.data.get("pwd")
    print("email",email)
    print("password",pwd)

    if email != None and pwd != None:
        print("her")
        for i in l:
            if i["email"] == email:
                if i["password"] == pwd:
                    jwt_token = create_jwt_token(i)
                    return Response({"jwtToken" : jwt_token})
                
    return Response(status=400)

@api_view(['GET','POST'])
def check_token(request):
    header = request.headers.get('Authorization')
    token = header.split(' ')[1]
    print(token)
    payload = decode_jwt(token)
    print(payload)
    for i in l:
        if i["userId"] == payload["userId"]:
            return Response(data={"user":i})

def create_jwt_token(user):
    current = int(time.time()*1000)
    payload ={
        "userId" : user["userId"],
        "expiry" : current + 3600 * 1000
    }

    jwt_token = jwt.encode(payload,"secret12345")

    return jwt_token

def decode_jwt(token):
    parts = token.split('.')
    if len(parts) != 3:
        raise ValueError("Invalid token format")

    payload = parts[1]
    padded = payload + '=' * (-len(payload) % 4)
    decoded_bytes = base64.urlsafe_b64decode(padded)
    decoded_payload = json.loads(decoded_bytes)

    return decoded_payload

@api_view(['POST'])
def Register(request):


    email=request.data.get("email")
    pwd = request.data.get("pwd")
    print(email,pwd)
    l.append({"email":email,
         "password":pwd,
         "userId":str(int(l[-1]["userId"])+1)})
    
    print(l)
    return Response(status=200)


    