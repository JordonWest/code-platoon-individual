from rest_framework import serializers
from .models import Table, Player, Membership

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields =['table_id', 'owner', 'address', 'tablename', 'email', 'about_table', 'game_type', 'tablesize_pref', 'homebrew', 'alcohol', 'session_lengths', 'table_status', 'table_times']

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['player_id', 'username', 'password', 'email', 'about_me', 'preferred_classes']

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['player', 'table']
        