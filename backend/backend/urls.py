from django.contrib import admin
from django.urls import path , include
from api.views import CreateUserView ,calculate_route
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def calculate_route(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request
            data = json.loads(request.body)
            
            # Mock response - replace with actual calculations
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
urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/",CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/calculate-route/', calculate_route),
]
