from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import os

@api_view(['POST'])
def payment_processing(request):
    # Extract data from the incoming request
    user_data = request.data.get('UserData', {})
    cart_items = request.data.get('cartItem', [])
    total_price = request.data.get('totalPrice')
    total_qty = request.data.get('totalQty')

    if not total_price or not total_qty:
        return Response({"error": "Missing required price or quantity data."}, status=400)

    # Prepare the payload for Chapa API request
    payload = {
        "amount": total_price,
        "currency": "ETB",
        "email": 'mearegbuna@gmail.com',
        "first_name": user_data.get("full_name"),
        "phone_number": user_data.get("phone_number"),
        "tx_ref": f"chewatatest-{os.urandom(4).hex()}",
        "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
        "return_url": "http://localhost:5173/",
        "customization": {
            "title": "Testing Payment",
            "description": "I love online payments"
        }
    }

    headers = {
        'Authorization': 'Bearer CHASECK_TEST-Pr7VEcpwPZ8GbwSc4wO5Wj22RYbxw9q2',
        'Content-Type': 'application/json'
    }

    try:
        # Make the request to Chapa API
        response = requests.post("https://api.chapa.co/v1/transaction/initialize", json=payload, headers=headers)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        response_data = response.json()

        # Check if the response contains a URL for redirection
        if response_data.get('status') == 'success' and 'data' in response_data:
            payment_url = response_data['data'].get('checkout_url')
            return Response({"payment_url": payment_url}, status=200)

        return Response({"error": "Payment initialization failed", "details": response_data}, status=400)

    except requests.exceptions.RequestException as e:
        return Response({"error": "An error occurred during the payment process", "details": str(e)}, status=500)
