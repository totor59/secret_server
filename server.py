#!/usr/bin/python
# coding: utf8
from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from functools import wraps
import yaml
import hashlib
import click


# CONFIG FILE
with open("config.yml", 'r') as ymlfile:
    cfg = yaml.load(ymlfile)
    usr = cfg['user']

app = Flask(__name__)

@app.cli.command()
def initdb():
    """Initialize the database."""
    passwd = hashlib.sha256(b'password').hexdigest()
    click.echo(passwd)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('logged_in'):
            return render_template('login.html')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/login', methods=['POST'])
def login():
    passwd = hashlib.sha256(request.form['password']).hexdigest()
    if passwd == usr['password'] and request.form['username'] == usr['name']:
        session['logged_in'] = True
    else:
        flash('Wrong username/password!')
    return home()


@login_required
@app.route("/logout")
def logout():
    session['logged_in'] = False
    return home()


@app.route('/')
@login_required
def home():
    return render_template('index.html')


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(host="0.0.0.0", debug=True, ssl_context=('cert.pem', 'key.pem'))
