from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from backend.models import Conjugation

# Create your views here.
def index(request):
    conjugation = Conjugation.objects.get(pk=2)
    template = loader.get_template('quiz/index.html')
    context = RequestContext(request, {
        'conjugation': conjugation,
    })
    return HttpResponse(template.render(context))
