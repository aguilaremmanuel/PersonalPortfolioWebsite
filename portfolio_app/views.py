from django.shortcuts import render
from django.http import JsonResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import EmailMessage
import logging
logger = logging.getLogger(__name__)

def landing_page(request):
    return render(request, 'index.html')

def inquire_page(request):
    return render(request, 'inquire.html')

def send_inquiry(request):

    if request.method == 'POST':
        
        email = request.POST.get('email')
        project_name = request.POST.get('project_name')
        description = request.POST.get('description')
        service = request.POST.get('service')

        try:
            validate_email(email)
        except ValidationError:
            return JsonResponse({'invalidEmail': True})
        
        subject = f'New Inquiry: {project_name}'
        message = f"""
        New Inquiry Received:
        - Email: {email}
        - Project Name: {project_name}
        - Service: {service}
        - Description: {description}
        """

        from_email = 'aguilaremman3@gmail.com'  # Replace with your email
        recipient_list = ['aguilaremman3@gmail.com']  # Replace with your receiving email

        try:
            email_message = EmailMessage(subject, message, from_email, recipient_list)
            email_message.send()
            logger.info("Email sent successfully.")
            return JsonResponse({'success': True})
        except Exception as e:
            logger.error(f"Email sending failed: {e}")
            return JsonResponse({'error': str(e)})

    return JsonResponse({'success': 'success'})

def private_project(request):
    return render(request, 'private-project.html')