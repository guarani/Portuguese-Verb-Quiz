from django.db import models

# Create your models here.
class Conjugation(models.Model):
    presentInfinitive = models.CharField(max_length=200)
    singularFirst = models.CharField(max_length=200)
    singularThird = models.CharField(max_length=200)
    pluralFirst = models.CharField(max_length=200)
    pluralThird = models.CharField(max_length=200)
    
    def __unicode__(self):
        return self.presentInfinitive
