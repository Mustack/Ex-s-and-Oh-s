from django.contrib.auth.models import User

class Player(models.User):
    user = models.ForeignKey(User, unique=True)
    win_count = models.IntegerField()