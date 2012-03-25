from django.contrib.auth.models import User, UserManager
from django.db import models

class Player(models.Model):
    user = models.OneToOneField(User)
    name = models.CharField(max_length=15, primary_key=True)
    win_count = models.IntegerField()
    
    class Meta:
        ordering = ["-win_count"]