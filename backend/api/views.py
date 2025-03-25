from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
import json
import requests



User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['POST'])
   
@csrf_exempt
def calculate_route(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            
            response_data = {
                "route": [
                    {"lat": 51.505, "lng": -0.09},  # current
                    {"lat": 51.51, "lng": -0.1},    # pickup
                    {"lat": 52.5, "lng": -1.9}      # dropoff
                ],
                "hos": {
                    "remaining_hours": 34.5,
                    "required_breaks": [
                        {"after": 8, "duration": 0.5}
                    ]
                }
            }
            return JsonResponse(response_data)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)

def geocode_address(address):
    # Example using Nominatim
    response = requests.get(
        'https://nominatim.openstreetmap.org/search',
        params={'q': address, 'format': 'json'}
    )
    data = response.json()
    if data:
        return {'lat': float(data[0]['lat']), 'lng': float(data[0]['lon'])}
    return None
    