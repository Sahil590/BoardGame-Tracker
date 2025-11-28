from rest_framework import viewsets
from .models import Player, Game, Match, Score
from .serializers import PlayerSerializer, GameSerializer, MatchSerializer, ScoreSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all().order_by('-date')
    serializer_class = MatchSerializer

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
