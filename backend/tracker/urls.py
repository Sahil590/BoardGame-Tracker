from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, GameViewSet, MatchViewSet, ScoreViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'games', GameViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'scores', ScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
