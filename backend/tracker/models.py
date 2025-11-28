from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Match(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game.name} on {self.date}"

class Score(models.Model):
    match = models.ForeignKey(Match, related_name='scores', on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.player.name}: {self.value}"
