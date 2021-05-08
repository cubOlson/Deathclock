from flask import Blueprint, request
from app.models import db, Tag

tag_routes = Blueprint('tag', __name__)