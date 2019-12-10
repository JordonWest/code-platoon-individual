from django.db import models
from datetime import datetime

class Player(models.Model):
    player_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.TextField()
    email = models.CharField(max_length=255, blank=True)
    about_me = models.TextField(blank=True)
    preferred_classes = models.TextField(blank=True)

    def __str__(self):
        return self.username

class Table(models.Model):
    table_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="player")
    players = models.ManyToManyField(Player, through='Membership')
    address = models.CharField(max_length=255)
    tablename = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    about_table = models.TextField()
    game_type = models.CharField(max_length=255)
    tablesize_pref = models.CharField(max_length=255)
    homebrew = models.CharField(max_length=255)
    alcohol = models.CharField(max_length=255)
    session_lengths = models.CharField(max_length=255)
    table_times = models.CharField(max_length=255)
    table_status = models.CharField(max_length=255)

    def __str__(self):
        return self.tablename

class Membership(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    # note
