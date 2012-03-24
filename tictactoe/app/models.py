from django.contrib.auth.models import User, UserManager
from django.db import models

class Player(models.Model):
    user = models.ForeignKey(User, unique=True)
    win_count = models.IntegerField()