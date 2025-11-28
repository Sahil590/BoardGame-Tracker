from rest_framework import serializers
from .models import Player, Game, Match, Score

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class ScoreSerializer(serializers.ModelSerializer):
    player_name = serializers.ReadOnlyField(source='player.name')
    
    class Meta:
        model = Score
        fields = ['id', 'match', 'player', 'value', 'player_name']

class MatchSerializer(serializers.ModelSerializer):
    game_name = serializers.ReadOnlyField(source='game.name')
    scores = ScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'game', 'date', 'created_at', 'game_name', 'scores']
