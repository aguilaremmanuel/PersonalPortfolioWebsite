from django.shortcuts import render


def landing_page(request):
    return render(request, 'index.html')

def inquire_page(request):
    return render(request, 'inquire.html')
