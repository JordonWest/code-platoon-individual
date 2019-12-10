from django.urls import path, include
from .views import PlayerViewSet, TableViewSet, MembershipViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'players', PlayerViewSet, basename='player')
router.register(r'tables', TableViewSet, basename='table')
router.register(r'memberships', MembershipViewSet, basename='membership')


urlpatterns = router.urls
