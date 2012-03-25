from django.shortcuts import render_to_response
from django.template import RequestContext
from tictactoe.app.models import Player
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django import forms


class LoginForm(forms.Form):
    playerName = forms.CharField(label="Name:")
    password = forms.CharField(label="Password",widget=forms.PasswordInput(render_value=False)) 


def home(request):
    def errorHandle(error):
        form = LoginForm()
        return render_to_response('home.html', {
                'error' : error,
                'login_form' : form,},
                context_instance=RequestContext(request))
        
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['playerName']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    player = Player.objects.get(pk=username)
                    return render_to_response('main.html', {
                        'player' : player,
                        'leaderboard' : getLeaderboard(),},
                        context_instance=RequestContext(request))
                    
            else:
                #If try succeeds then the username exists and the password is wrong
                try:
                    player = Player.objects.get(pk=username)
                    error = 'invalid login'
                    return errorHandle(error)
                except Player.DoesNotExist:
                    #we have to create a new user and log them in
                    newUser = User.objects.create_user(username,'',password)
                    newUser.is_active = True
                    newUser.save()
                    newUser = authenticate(username=username, password=password)
                    login(request, newUser)
                    #now a Player with that user
                    player = Player(user=newUser, name = username, win_count=0)
                    player.save()
                    #time for the player to start playing
                    return render_to_response('main.html', {
                        'player' : player,
                        'leaderboard' : getLeaderboard(),},
                        context_instance=RequestContext(request))
                    
        else:
            error = 'form is invalid'
            return errorHandle(error)
    else:
        form = LoginForm()
        return render_to_response('home.html', {
            'login_form' : form,},
            context_instance=RequestContext(request))

def main(request):
    return render_to_response("main.html", {
                        'leaderboard' : getLeaderboard(),},)
def logout_view(request):
    logout(request)
    return home(request)

def getLeaderboard():
    return Player.objects.all()[:5]